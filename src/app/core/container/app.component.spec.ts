import { AppComponent } from "./app.component";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    }));

    it("should render the App", () => {
        expect(component).toBeTruthy();
    });
});
