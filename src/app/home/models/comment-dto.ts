export interface CommentDto {
    id: number;
    text: string;
    postId: number;
    username: string;
    isDeletable: boolean;
    timestamp: Date;
}
