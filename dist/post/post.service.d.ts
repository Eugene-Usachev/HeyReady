import { Comments, Post as Post1 } from "./post.model";
import { User } from "../user/users.model";
import { Comment, UserPostFromClient as UserPostType } from './types/types';
export declare class PostService {
    private PostRepository;
    private UserRepository;
    private CommentRepository;
    constructor(PostRepository: typeof Post1, UserRepository: typeof User, CommentRepository: typeof Comments);
    CheckUser(UserId: number, UserPassword: string): Promise<number>;
    CreatePost(UserId: number, UserPassword: string, UserPost1: UserPostType): Promise<unknown>;
    DeletePost(UserId: number, UserPassword: string, NumberOfPost: number, NumberOfPack: number): Promise<unknown>;
    LikePost(UserId: number, UserPassword: string, NumberOfPost: number, NumberOfPack: number, Author: number): Promise<unknown>;
    UnLikePost(UserId: number, UserPassword: string, NumberOfPost: number, NumberOfPack: number, Author: number): Promise<unknown>;
    DislikePost(UserId: number, UserPassword: string, NumberOfPost: number, NumberOfPack: number, Author: number): Promise<unknown>;
    UnDislikePost(UserId: number, UserPassword: string, NumberOfPost: number, NumberOfPack: number, Author: number): Promise<unknown>;
    GetPostByUserId(id: any, number: number): Promise<unknown>;
    AddComment(UserId: number, UserPassword: string, Author: number, NumberOfPost: number, NumberOfPack: number, Comment: Comment): Promise<unknown>;
    DeleteComment(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number, NumberOfComment: number): Promise<unknown>;
    LikeComment(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number, NumberOfComment: number): Promise<unknown>;
    DislikeComment(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number, NumberOfComment: number): Promise<unknown>;
    UnLikeComment(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number, NumberOfComment: number): Promise<unknown>;
    UnDislikeComment(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number, NumberOfComment: number): Promise<unknown>;
    GetComments(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number): Promise<unknown>;
    VoteInSurvey(UserId: number, UserPassword: string, AuthorOfPost: number, NumberOfPost: number, NumberOfPack: number, VotedFor: number[]): Promise<unknown>;
}
