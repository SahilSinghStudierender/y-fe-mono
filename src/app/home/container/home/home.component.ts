import { Component, OnDestroy } from "@angular/core";
import { PostService } from "../../../shared/service/post.service";
import { PostDto } from "../../../shared/models/post-dto";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, fromEvent, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Validators as EditorValidators } from "ngx-editor";
import { SubcategoriesDto } from "../../../shared/models/subcategories-dto";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnDestroy {
    public loading = false;
    public posts: PostDto[] = [];
    public topics: string[] = [];
    public subcategories: SubcategoriesDto[];
    public inputSubscription: Subscription;
    private isFiltered = false;
    public searchInput = new FormControl("");
    public defaultSubCategoryId = -1;
    private currentPage = 0;
    private scrollSubscription?: Subscription;
    private gotLastPage = false;
    public sortDirection: "desc" | "asc" = "desc";
    showEditor = false;
    form = new FormGroup({
        title: new FormControl("", Validators.required),
        editorContent: new FormControl("", EditorValidators.required()),
        topic: new FormControl("", Validators.required),
        subcategory: new FormControl(this.defaultSubCategoryId, Validators.min(0))
    });

    constructor(private postService: PostService,
                private router: Router) {
        // Setup Infinite Scroll
        const scrollEvents = fromEvent(window, "scroll");
        this.scrollSubscription = scrollEvents.pipe(
            debounceTime(200)  // Adjust debounce time as necessary
        ).subscribe(() => {
            if (this.isNearBottom() && !this.loading && !this.gotLastPage && !this.isFiltered) {
                this.loadMorePosts();
            }
        });

        // Setup Search Input
        this.inputSubscription = this.searchInput.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
        ).subscribe((value) => {
            if (!value) {
                this.currentPage = 0;
                this.isFiltered = false;

                this.getAllPosts(true);
                return;
            }

            this.loading = true;
            setTimeout(() => {
                this.postService.getPostsByTitleSearch(value).subscribe({
                    next: (result) => {
                        this.posts = result;
                        this.isFiltered = true;
                    },
                    error: (err) => {
                        console.log("Error fetching by Title", err);
                    },
                    complete: () => {
                        this.loading = false;
                    }
                });
            }, 500);
        });

        // Get all Posts by default
        this.getAllPosts();
    }

    ngOnDestroy() {
        this.inputSubscription.unsubscribe();
        this.scrollSubscription?.unsubscribe();
    }

    private getAllPosts(resetPosts = false) {
        // Get all Posts as default
        this.loading = true;
        setTimeout(() => {
            this.postService.getAllPosts(this.currentPage, this.sortDirection).subscribe({
                next: (page) => {
                    if(resetPosts) {
                        this.posts = page.value;
                    } else {
                        this.posts.push(...page.value);
                    }
                    this.gotLastPage = page.isLastPage;
                },
                error: (error) => {
                    console.error("Could not fetch Posts", error);
                },
                complete: () => {
                    this.loading = false;
                }
            });
        }, 500);
    }

    private getAllTopics() {
        this.postService.getAllTopics().subscribe({
            next: (topics) => {
                this.topics = topics.topics;
            },
            error: (error) => {
                console.error("Could not fetch topics", error);
            },
        });
    }

    private getAllSubcategories() {
        this.postService.getAllSubcategories().subscribe({
            next: (subcategories) => {
                this.subcategories = subcategories;
            },
            error: (error) => {
                console.error("Could not fetch subcategories", error);
            },
        });
    }

    createPostClicked() {
        this.showEditor = true;
        this.getAllTopics();
        this.getAllSubcategories();
    }

    submitPost() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach(field => {
                const control = this.form.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
            return;
        } else {
            this.postService.createPost({
                topic: this.form.get("topic")!.value!,
                body: this.form.get("editorContent")!.value!,
                heading: this.form.get("title")!.value!,
                subCategoryId: this.form.get("subcategory")!.value!
            }).subscribe({
                next: (newPost: PostDto) => {
                    this.showEditor = false;
                    this.posts.unshift(newPost);
                },
                error: (err) => {
                    console.error("Error while creating post", err);
                },
                complete: () => {
                    this.form.reset();
                    Object.keys(this.form.controls).forEach(key => {
                        const control = this.form.get(key);
                        control?.markAsPristine();
                        control?.markAsUntouched();
                        control?.updateValueAndValidity();
                        control?.setErrors(null);
                    });
                }

            });
        }
    }

    public validateFormControl(formControlName: string): boolean {
        // Here, "!" is used since there are only 2 properties to check => Hardcoded and not dynamic. will always be available
        return this.form.get(formControlName)!.invalid &&
            (this.form.get(formControlName)!.dirty ||
                this.form.get(formControlName)!.touched) || false;
    }

    topicSelected(topic: string) {
        this.form.get("topic")?.setValue(topic);
    }

    subcategorySelected(subcategory: SubcategoriesDto) {
        this.form.get("subcategory")?.setValue(subcategory.id);
    }

    getSelectedSubcategory(id: number): string {
        if (id === this.defaultSubCategoryId) {
            return "Select Subcategory";
        }
        return this.subcategories.filter((item) => item.id === id)[0].name;
    }

    loadMorePosts() {
        this.loading = true;
        this.currentPage++;
        this.getAllPosts();
    }

    private isNearBottom(): boolean {
        const threshold = 150; // Distance from the bottom of the page, adjust as needed
        const position = window.innerHeight + window.scrollY;
        const height = document.body.offsetHeight;
        return position + threshold >= height;
    }

    public sortClicked() {
        this.sortDirection = this.sortDirection === "desc" ? "asc" : "desc";
        this.currentPage = 0;
        this.getAllPosts(true);
    }
}
