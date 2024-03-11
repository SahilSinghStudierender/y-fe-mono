import { Component } from "@angular/core";
import { PostDto } from "../../../home/models/post-dto";
import { LocalStorageService } from "../../../shared/service/local-storage-service.service";

@Component({
    selector: "app-favourite",
    templateUrl: "./favourite-container.component.html",
    styleUrls: ["./favourite-container.component.scss"]
})
export class FavouriteContainerComponent {

    favouritePosts: PostDto[] = [];
    constructor(private localstorageService: LocalStorageService) {
        this.favouritePosts = localstorageService.getPosts();
    }
}
