import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginDto } from "../../models/login-dto";
import { AuthService } from "../../service/auth.service";
import { LocalStorageService } from "../../../shared/service/local-storage-service.service";
import { LS_AUTH_TOKEN_KEY, LS_REFRESH_TOKEN_KEY } from "../../../shared/const/const";
import { Router } from "@angular/router"; 

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
    loginForm = new FormGroup({
        username: new FormControl<string>("", Validators.required),
        password: new FormControl<string>("", Validators.required)
    });
    loginErrorMsg = "";
    loading = false;

    constructor(private loginService: AuthService,
                private localStorageService: LocalStorageService,
                private router: Router) {
    }

    public submitLogin(): void {
        this.loading = true;

        const username = this.loginForm.get("username")?.value;
        const password = this.loginForm.get("password")?.value;

        if (this.loginForm.valid && username && password) {
            const loginData: LoginDto = {
                userName: username,
                password: password
            };

            // For better UX - user should see the loading spinner for the login process
            setTimeout(() => {
                this.loginService.loginUser(loginData).subscribe({
                    next: (response) => {
                        this.localStorageService.setItem(LS_AUTH_TOKEN_KEY, response.authToken);
                        this.localStorageService.setItem(LS_REFRESH_TOKEN_KEY, response.refreshToken);

                        this.router.navigateByUrl("/").then(() => {
                            this.loading = false;
                        });
                    },
                    error: (error) => {
                        if (error.status === 403) {
                            this.loginErrorMsg = "Username or password wrong!";
                        } else {
                            this.loginErrorMsg = "An unknown error occurred! Please contact the Y-Team.";
                        }

                        this.loading = false;
                    }
                });
            }, 500);
        } else {
            Object.keys(this.loginForm.controls).forEach(field => {
                const control = this.loginForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
            this.loading = false;
        }
    }

    public validateFormControl(formControlName: string): boolean {
        // Here, "!" is used since there are only 2 properties to check => Hardcoded and not dynamic. will always be available
        return this.loginForm.get(formControlName)!.invalid &&
            (this.loginForm.get(formControlName)!.dirty ||
                this.loginForm.get(formControlName)!.touched) || false;
    }
}
 
