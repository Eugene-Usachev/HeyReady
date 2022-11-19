interface UserPost {
    music_files: string[] | null;
    image_files: string[] | null;
    other_files: string[] | null;
    video_files: string[] | null;
    IsMultipleChoice: boolean;
    VisibleBy: 'All' | 'Friends';
    title: string;
    likes: number;
    dislikes: number;
    date: string;
    survey: boolean;
    comments: number | null;
    likedBy: number[];
    dislikedBy: number[];
}
export interface UserPostFromClient {
    numberOfPack: number;
    music_files: string[] | null;
    image_files: string[] | null;
    other_files: string[] | null;
    video_files: string[] | null;
    VisibleBy: 'All' | 'Friends';
    IsMultipleChoice: boolean | null;
    title: string;
    likes: number;
    dislikes: number;
    date: string;
    survey: SurveyLine[] | false;
    likedBy: number[];
    dislikedBy: number[];
}
declare type RealUserPost = UserPost | 'deleted';
export declare class Types {
    object: RealUserPost[];
}
interface SurveyLine {
    text: string;
    voices: {
        Number: number;
        votedBy: number[];
    };
}
export interface Comment {
    date: string;
    authorName: string;
    authorId: number;
    content: string;
    likes: number;
    dislikes: number;
    Number: number;
    likedBy: number[];
    dislikedBy: number[];
}
export {};
