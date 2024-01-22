import { Component, Input, OnDestroy } from "@angular/core";
import { Editor, Toolbar } from "ngx-editor";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"]
})
export class EditorComponent implements OnDestroy {

    @Input() form: FormGroup;
    @Input() showMinimalToolbar?: boolean = false;
    editor: Editor = new Editor();
    toolbar: Toolbar = [
        ["bold", "italic"],
        ["underline", "strike"],
        ["code", "blockquote"],
        ["ordered_list", "bullet_list"],
        [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
        ["link"],
        ["text_color", "background_color"],
        ["align_left", "align_center", "align_right", "align_justify"],
    ];
    minimalToolbar: Toolbar = [
        ["bold", "italic"],
        ["underline", "strike"],
        ["link"],
        ["text_color", "background_color"],
    ];

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    public validateFormControl(): boolean {
        // Here, "!" is used since there are only 2 properties to check => Hardcoded and not dynamic. will always be available
        return this.form.get("editorContent")!.invalid &&
            (this.form.get("editorContent")!.dirty ||
                this.form.get("editorContent")!.touched) || false;
    }
}
