import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginFormComponent } from "./login-form.component";
import { AuthService } from "../../service/auth.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LoginFormComponent", () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [LoginFormComponent],
            providers: [AuthService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
 
