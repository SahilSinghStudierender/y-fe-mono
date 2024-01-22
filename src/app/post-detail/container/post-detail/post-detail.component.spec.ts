import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostDetailComponent } from "./post-detail.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostService } from "../../../home/service/post.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("PostDetailComponent", () => {
    let component: PostDetailComponent;
    let fixture: ComponentFixture<PostDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [PostDetailComponent],
            providers: [PostService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PostDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
 
