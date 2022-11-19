import { Model } from "sequelize-typescript";
interface PostCreationAttr {
    id: number;
    author: number;
    number: number;
    object: string;
}
export declare class Post extends Model<Post, PostCreationAttr> {
    id: number;
    author: number;
    number: number;
    object: string;
}
interface Comments__CreationAttr {
    author: number;
    numberOfPack: number;
    numberOfPost: number;
    object: string;
}
export declare class Comments extends Model<Comments, Comments__CreationAttr> {
    id: number;
    author: number;
    numberOfPack: number;
    numberOfPost: number;
    object: string;
}
export {};
