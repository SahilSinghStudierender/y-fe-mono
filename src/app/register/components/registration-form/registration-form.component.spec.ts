import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistrationFormComponent } from "./registration-form.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../../../login/service/auth.service";

describe("RegistrationFormComponent", () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ RegistrationFormComponent ],
            providers: [AuthService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
}); 
