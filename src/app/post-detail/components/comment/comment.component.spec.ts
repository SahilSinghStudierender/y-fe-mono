import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentComponent } from "./comment.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostService } from "../../../shared/service/post.service";

describe("CommentComponent", () => {
    let component: CommentComponent;
    let fixture: ComponentFixture<CommentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CommentComponent],
            providers: [PostService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
