import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginDto } from "../models/login-dto";
import { Observable } from "rxjs";
import { LoginResponseDto } from "../models/login-response-dto";
import { environment } from "../../../environments/environment";
import { RegisterDto } from "../../register/models/register-dto";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public registerUser(registrationData: RegisterDto): Observable<void> {
        return this.http.post<void>(`${environment.backendUrl}/auth/register`, registrationData);
    }

    public loginUser(loginData: LoginDto): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(`${environment.backendUrl}/auth/login`, loginData);
    }

    public refreshToken(refreshToken: string): Observable<LoginResponseDto> {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${refreshToken}`);
        return this.http.post<LoginResponseDto>(`${environment.backendUrl}/auth/refresh-token`, {}, { headers });
    }

    public logoutUser(token: string): Observable<void> {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        return this.http.post<void>(`${environment.backendUrl}/auth/logout`, {}, { headers });
    }

}
 
