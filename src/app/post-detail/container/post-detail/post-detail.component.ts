import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../../../shared/service/post.service";
import { defaultPost, PostDto } from "../../../shared/models/post-dto";
import { CommentDto } from "../../../shared/models/comment-dto";
import { DomSanitizer } from "@angular/platform-browser";
import { LocalStorageService } from "../../../shared/service/local-storage-service.service";

@Component({
    selector: "app-post-detail",
    templateUrl: "./post-detail.component.html",
    styleUrls: ["./post-detail.component.scss"]
})
export class PostDetailComponent implements OnInit {

    id: number | null = null;
    paramError = false;
    post: PostDto = defaultPost;
    comments: CommentDto[] = [];
    loadingPost = false;
    loadingComments = false;

    constructor(private route: ActivatedRoute, private postService: PostService,
                public sanitizer: DomSanitizer, private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get("id"));
        if (isNaN(this.id)) {
            console.error("Invalid Param!");
            this.paramError = true;
        }

        this.loadingComments = true;

        this.postService.getPostById(this.id).subscribe({
            next: (value) => {
                this.post = value;
                this.postService.getCommentOfPost(this.id!).subscribe({
                    next: (comments) => {
                        this.comments = comments;
                    },
                    error: (err) => {
                        console.error(`Error on fetching comments for Post with id ${this.id}`, err);
                    }
                });
            },
            error: (err) => {
                console.error(`Error on fetching Post with id ${this.id}`, err);
            },
            complete: () => {
                this.loadingPost = false;
                this.loadingComments = false;
            }
        });
    }

    postIsFavourite() {
        return this.localStorageService.idExists(this.post.id);
    }

    setToFavourite() {
        if (this.localStorageService.idExists(this.post.id)) {
            this.localStorageService.deletePost(this.post.id);
            return;
        }
        this.localStorageService.addPost(this.post);
    }
}
