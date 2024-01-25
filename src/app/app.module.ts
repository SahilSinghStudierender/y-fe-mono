import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./core/container/app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home/container/home/home.component";
import { NavbarComponent } from "./shared/navbar/navbar/navbar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PostOverviewComponent } from "./home/components/post-overview/post-overview.component";
import { PostDetailComponent } from "./post-detail/container/post-detail/post-detail.component";
import { CommentComponent } from "./post-detail/components/comment/comment.component";
import { EditorComponent } from "./shared/components/editor/editor.component";
import { NgxEditorModule } from "ngx-editor";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        PostOverviewComponent,
        PostDetailComponent,
        CommentComponent,
        EditorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxEditorModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
