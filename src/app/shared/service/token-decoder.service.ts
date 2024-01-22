import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage-service.service";
import { LS_AUTH_TOKEN_KEY } from "../const/const";
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class TokenDecoderService {

    constructor(private localStorageService: LocalStorageService) {
    }

    getUsername(): string | null {
        return this.decodeToken()?.username || null;
    }

    isTokenValid(): boolean {
        const expirationDate = this.decodeToken()?.expirationDate || null;
        if (!expirationDate) return false;

        return expirationDate > new Date();
    }

    private decodeToken(): { username: string, expirationDate: Date } | null {
        try {
            const token = this.localStorageService.getItem<string>(LS_AUTH_TOKEN_KEY);

            if (!token) {
                return null;
            }

            const decodedToken: any = jwtDecode(token);
            const username = decodedToken.sub;
            const expirationDate = new Date(decodedToken.exp * 1000);

            return { username, expirationDate };
        } catch (error) {
            console.error("Could not decode token", error);
            return null;
        }
    }
}
