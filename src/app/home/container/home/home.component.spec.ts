import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PostService } from "../../service/post.service";

describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HomeComponent],
            providers: [PostService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
