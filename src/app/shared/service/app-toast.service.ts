import { Injectable } from "@angular/core";

export interface ToastInfo {
    body: string;
    delay?: number;
    error?: boolean;
}

@Injectable({
    providedIn: "root"
})
export class AppToastService {

    toasts: ToastInfo[] = [];

    show(toast: ToastInfo) {
        if (this.toasts.filter((item) => item.body === toast.body).length > 0) return;
        this.toasts.push({ body: toast.body, delay: toast.delay, error: toast.error });
    }

    remove(toast: ToastInfo) {
        this.toasts = this.toasts.filter(t => t != toast);
    }
} 
