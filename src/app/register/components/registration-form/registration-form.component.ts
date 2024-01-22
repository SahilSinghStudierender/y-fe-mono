import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../login/service/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-registration-form",
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.scss"]
})
export class RegistrationFormComponent {

    registrationForm = new FormGroup({
        username: new FormControl<string>("", [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
        email: new FormControl<string>("", [Validators.required, Validators.email]),
        password: new FormControl<string>("", [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
    });
    loading = false;
    registerErrorMsg = "";

    constructor(private loginService: AuthService, private router: Router) {
    }

    public submitRegistration() {
        this.loading = true;

        const userName = this.registrationForm.get("username")?.value;
        const email = this.registrationForm.get("email")?.value;
        const password = this.registrationForm.get("password")?.value;

        if (this.registrationForm.invalid || !userName || !email || !password) {
            Object.keys(this.registrationForm.controls).forEach(field => {
                const control = this.registrationForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
            this.loading = false;
            return;
        }
        setTimeout(() => {
            this.loginService.registerUser({
                userName,
                email,
                password
            }).subscribe({
                next: () => {
                    this.router.navigateByUrl("/").then(() => {
                        this.loading = false;
                    });
                },
                error: (error) => {
                    // TODO: Add Error Msg like "User already exists" - can be done after backend is fixed
                    this.registerErrorMsg = "An unknown error occurred! Please contact the Y-Team.";
                    this.loading = false;
                }
            });
        }, 500);
    }

    public validateFormControl(formControlName: string): boolean {
        // Here, "!" is used since there are only 2 properties to check => Hardcoded and not dynamic. will always be available
        return this.registrationForm.get(formControlName)!.invalid &&
            (this.registrationForm.get(formControlName)!.dirty ||
                this.registrationForm.get(formControlName)!.touched) || false;
    }

}
