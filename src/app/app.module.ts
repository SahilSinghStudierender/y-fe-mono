import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./core/container/app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home/container/home/home.component";
import { RegisterComponent } from "./register/container/register/register.component";
import { NavbarComponent } from "./shared/navbar/navbar/navbar.component";
import { LoginComponent } from "./login/container/login/login.component";
import { LoginFormComponent } from "./login/components/login-form/login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./shared/interceptor/auth.interceptor";
import { RegistrationFormComponent } from "./register/components/registration-form/registration-form.component";
import { PostOverviewComponent } from "./home/components/post-overview/post-overview.component";
import { PostDetailComponent } from "./post-detail/container/post-detail/post-detail.component";
import { CommentComponent } from "./post-detail/components/comment/comment.component";
import { EditorComponent } from "./shared/components/editor/editor.component";
import { NgxEditorModule } from "ngx-editor";
import { ToastComponent } from "./shared/components/toast/toast.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        NavbarComponent,
        LoginComponent,
        LoginFormComponent,
        RegistrationFormComponent,
        PostOverviewComponent,
        PostDetailComponent,
        CommentComponent,
        EditorComponent,
        ToastComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxEditorModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
