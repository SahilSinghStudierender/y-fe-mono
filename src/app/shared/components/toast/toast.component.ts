import { Component } from "@angular/core";
import { AppToastService } from "../../service/app-toast.service";

@Component({
    selector: "app-toast",
    templateUrl: "./toast.component.html",
    styleUrls: ["./toast.component.scss"]
})
export class ToastComponent {

    constructor(public toastService: AppToastService) {
    }

}
