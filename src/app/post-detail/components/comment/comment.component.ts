import { Component, Input } from "@angular/core";
import { CommentDto } from "../../../home/models/comment-dto";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "ngx-editor";
import { PostService } from "../../../home/service/post.service";
import { AppToastService } from "../../../shared/service/app-toast.service";
import { CreateCommentDto } from "../../../home/models/create-comment-dto";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-comment",
    templateUrl: "./comment.component.html",
    styleUrls: ["./comment.component.scss"]
})
export class CommentComponent {
    @Input() comments: CommentDto[] = [];
    @Input() postId: number;
    innerHtml = "";
    form = new FormGroup({
        editorContent: new FormControl("", Validators.required()),
    });

    constructor(private postService: PostService, private toastService: AppToastService,
                public sanitizer: DomSanitizer) {
    }



    publishComment() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach(field => {
                const control = this.form.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
            return;
        }

        const commentToCreate: CreateCommentDto = {
            text: this.form.get("editorContent")!.value!,
            postId: this.postId
        };

        this.postService.createCommentForPost(commentToCreate).subscribe({
            next: (comment) => {
                this.toastService.show({ body: "Comment published!" });
                this.comments.push(comment);

                this.form.reset();
                Object.keys(this.form.controls).forEach(key => {
                    const control = this.form.get(key);
                    control?.markAsPristine();
                    control?.markAsUntouched();
                    control?.updateValueAndValidity();
                    control?.setErrors(null);
                });
            },
            error: (error) => {
                console.error("Could not publish comment", error);
                this.toastService.show({ body: "Could not publish comment, try again later!", error: true });
            },
        });
    }
}
