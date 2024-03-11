import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/container/home/home.component";
import { PostDetailComponent } from "./post-detail/container/post-detail/post-detail.component";
import { FavouriteContainerComponent } from "./favourite/container/favourite/favourite-container.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "post/:id", component: PostDetailComponent },
    { path: "favourite", component: FavouriteContainerComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
