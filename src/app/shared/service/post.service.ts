import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostDto } from "../models/post-dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { CommentDto } from "../models/comment-dto";
import { TopicDto } from "../models/topic-dto";
import { SubcategoriesDto } from "../models/subcategories-dto";
import { CreatePostDto } from "../models/create-post-dto";
import { PageDto } from "../models/page-dto";
import { PAGE_SIZE } from "../const/const";
import { CreateCommentDto } from "../models/create-comment-dto";

@Injectable({
    providedIn: "root"
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    public getAllPosts(page: number, sort: "desc" | "asc" = "desc"): Observable<PageDto<PostDto>> {
        return this.http.get<PageDto<PostDto>>(`${environment.backendUrl}/posts?page=${page}&pageSize=${PAGE_SIZE}&sort=${sort}`);
    }

    public getPostsByTitleSearch(title: string): Observable<PostDto[]> {
        return this.http.get<PostDto[]>(`${environment.backendUrl}/posts/filtered?title=${title}`);
    }

    public getPostById(postId: number): Observable<PostDto> {
        return this.http.get<PostDto>(`${environment.backendUrl}/posts/${postId}`);
    }

    public getCommentOfPost(postId: number): Observable<CommentDto[]> {
        return this.http.get<CommentDto[]>(`${environment.backendUrl}/comments/${postId}`);
    }

    public getAllTopics(): Observable<TopicDto> {
        return this.http.get<TopicDto>(`${environment.backendUrl}/posts/topics`);
    }

    public getAllSubcategories(): Observable<SubcategoriesDto[]> {
        return this.http.get<SubcategoriesDto[]>(`${environment.backendUrl}/posts/subcategories`);
    }

    public createPost(post: CreatePostDto): Observable<PostDto> {
        return this.http.post<PostDto>(`${environment.backendUrl}/posts`, post);
    }

    public createCommentForPost(comment: CreateCommentDto): Observable<CommentDto> {
        return this.http.post<CommentDto>(`${environment.backendUrl}/comments`, comment);
    }
}
