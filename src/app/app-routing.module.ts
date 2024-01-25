import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/container/home/home.component";
import { PostDetailComponent } from "./post-detail/container/post-detail/post-detail.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "post/:id", component: PostDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
