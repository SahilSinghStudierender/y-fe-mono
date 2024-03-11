import { Injectable } from "@angular/core";
import { PostDto } from "../../home/models/post-dto";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    private localStorageKey = "favourite_posts";

    addPost(post: PostDto): void {
        const posts = this.getPosts();
        posts.push(post);
        this.savePostsToLocalStorage(posts);
    }

    getPosts(): PostDto[] {
        const postsJSON = localStorage.getItem(this.localStorageKey);
        if (postsJSON) {
            return JSON.parse(postsJSON);
        }
        return [];
    }

    deletePost(id: number): void {
        let posts = this.getPosts();
        posts = posts.filter((post) => post.id !== id);
        this.savePostsToLocalStorage(posts);
    }

    idExists(id: number): boolean {
        const posts = this.getPosts();
        return posts.some((post) => post.id === id);
    }

    private savePostsToLocalStorage(posts: PostDto[]): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
    }
}
