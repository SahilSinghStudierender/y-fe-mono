export interface PostDto {
    id: number;
    subCategory: string;
    topic: string;
    heading: string;
    body: string;
    timestamp: Date;
    commentCount: number;
    isDeletable: boolean;
}

export const defaultPost: PostDto = {
    id: 0,
    subCategory: "",
    topic: "",
    heading: "",
    body: "",
    timestamp: new Date(),
    commentCount: 0,
    isDeletable: false,
};
