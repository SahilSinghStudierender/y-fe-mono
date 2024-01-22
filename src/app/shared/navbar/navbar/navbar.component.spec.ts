import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavbarComponent } from "./navbar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../../../login/service/auth.service";

describe("NavbarComponent", () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [NavbarComponent],
            providers: [AuthService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
