import { Component } from "@angular/core";
import { TokenDecoderService } from "../../service/token-decoder.service";
import { LocalStorageService } from "../../service/local-storage-service.service";
import { LS_AUTH_TOKEN_KEY, LS_REFRESH_TOKEN_KEY } from "../../const/const";
import { AuthService } from "../../../login/service/auth.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {

    constructor(public tokenDecoderService: TokenDecoderService,
                private localStorageService: LocalStorageService,
                private authService: AuthService) {
    }

    logoutUser() {
        const token = this.localStorageService.getItem<string>(LS_AUTH_TOKEN_KEY);
        if (!token) {
            // Do it anyways - safety first
            this.clearTokenStorage();
            return;
        }

        this.authService.logoutUser(token).subscribe({
            error: (error) => {
                console.error("Could not call logout endpoint: ", error);
            },
            complete: () => {
                this.clearTokenStorage();
                window.location.reload();
            }
        });

    }

    private clearTokenStorage() {
        this.localStorageService.removeItem(LS_AUTH_TOKEN_KEY);
        this.localStorageService.removeItem(LS_REFRESH_TOKEN_KEY);
    }

}
