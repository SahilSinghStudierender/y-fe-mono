import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { LocalStorageService } from "../service/local-storage-service.service";
import { LS_AUTH_TOKEN_KEY, LS_REFRESH_TOKEN_KEY } from "../const/const";
import { AuthService } from "../../login/service/auth.service";
import { LoginResponseDto } from "../../login/models/login-response-dto";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );
    constructor(private localStorageService: LocalStorageService,
                private loginService: AuthService,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has("Content-Type")) {
            request = request.clone({
                headers: request.headers.set("Content-Type", "application/json"),
            });
        }

        const token = this.localStorageService.getItem<string>(LS_AUTH_TOKEN_KEY);
        if (token) {
            request = this.addTokenHeader(request, token);
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof  HttpErrorResponse && error.status === 403) {
                    return this.handle401Error(request, next);
                }
                return throwError(() => new HttpErrorResponse(error));
            })
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        if (!request.url.includes("/auth")) {
            return request.clone({
                headers: request.headers.set("Authorization", "Bearer " + token),
            });
        }

        return request;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        console.log("Handling 403");
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const refreshToken = this.localStorageService.getItem<string>(LS_REFRESH_TOKEN_KEY);

            if (refreshToken)
                return this.loginService.refreshToken(refreshToken).pipe(
                    switchMap((token: LoginResponseDto) => {
                        this.isRefreshing = false;

                        this.localStorageService.setItem(LS_AUTH_TOKEN_KEY, token.authToken);
                        this.localStorageService.setItem(LS_REFRESH_TOKEN_KEY, token.refreshToken);
                        this.refreshTokenSubject.next(token);

                        return next.handle(this.addTokenHeader(request, token.authToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;
                        this.localStorageService.clear();

                        // if we get a new token but the token does not work we return to login page
                        this.router
                            .navigate([""])
                            .then();

                        return throwError(() => new Error(err));
                    })
                );
        }
        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }
}
 
