import { PostService } from "./post.service";
import { UserPostFromClient, Comment } from "./types/types";
export declare class PostController {
    private PostService;
    constructor(PostService: PostService);
    create(Body: {
        UserId: any;
        UserPassword: any;
        UserPost: UserPostFromClient;
    }): Promise<unknown> | "{\"status\": 400}" | "err";
    getPost(Body: {
        AuthorId: number;
        number: number;
    }): Promise<unknown> | "{\"status\": 400}" | "err";
    deletePost(Body: {
        UserId: any;
        UserPassword: any;
        NumberOfPost: any;
        NumberOfPack: any;
    }): Promise<unknown> | "{\"status\": 400}";
    likePost(Body: {
        UserId: any;
        UserPassword: any;
        NumberOfPost: any;
        NumberOfPack: any;
        Author: any;
    }): Promise<unknown> | "{\"status\": 400}" | "err";
    unlikePost(Body: {
        UserId: any;
        UserPassword: any;
        NumberOfPost: any;
        NumberOfPack: any;
        Author: any;
    }): Promise<unknown> | "{\"status\": 400}" | "err";
    dislikePost(Body: {
        UserId: any;
        UserPassword: any;
        NumberOfPost: any;
        NumberOfPack: any;
        Author: any;
    }): Promise<unknown> | "{\"status\": 400}" | "err";
    undislikePost(Body: {
        UserId: any;
        UserPassword: any;
        NumberOfPost: any;
        NumberOfPack: any;
        Author: any;
    }): Promise<unknown> | "{\"status\": 400}" | "err";
    addComment(Body: {
        UserId: number;
        UserPassword: string;
        Author: number;
        NumberOfPost: number;
        NumberOfPack: number;
        Comment: Comment;
    }): Promise<unknown> | "{\"status\": 400}";
    deleteComment(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
        NumberOfComment: number;
    }): Promise<unknown> | "{\"status\": 400}";
    likeComment(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
        NumberOfComment: number;
    }): Promise<unknown> | "{\"status\": 400}";
    dislikeComment(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
        NumberOfComment: number;
    }): Promise<unknown> | "{\"status\": 400}";
    unlikeComment(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
        NumberOfComment: number;
    }): Promise<unknown> | "{\"status\": 400}";
    undislikeComment(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
        NumberOfComment: number;
    }): Promise<unknown> | "{\"status\": 400}";
    getComments(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
    }): Promise<unknown> | "{\"status\": 400}";
    VoteInSurvey(Body: {
        UserId: number;
        UserPassword: string;
        AuthorOfPost: number;
        NumberOfPost: number;
        NumberOfPack: number;
        VotedFor: number[];
    }): Promise<unknown> | "{\"status\": 400}";
}
