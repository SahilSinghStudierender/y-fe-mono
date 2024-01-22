import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../../home/service/post.service";
import { defaultPost, PostDto } from "../../../home/models/post-dto";
import { CommentDto } from "../../../home/models/comment-dto";
import { AppToastService } from "../../../shared/service/app-toast.service";
import { DomSanitizer } from "@angular/platform-browser";

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
                private router: Router, private toastService: AppToastService,
                public sanitizer: DomSanitizer) {
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

    deletePost(postId: number) {
        this.postService.deletePost(postId).subscribe({
            next: () => {
                this.router.navigate(["/"]).then(() => {
                    this.toastService.show({ body: "Post deleted!" });
                });
            },
            error: (error) => {
                console.error("Could not delete post", error);
                this.toastService.show({ body: "Could not delete post, try again later!", error: true });
            }
        });
    }
}
