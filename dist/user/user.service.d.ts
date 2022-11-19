/// <reference types="express-serve-static-core" />
/// <reference types="cookie-parser" />
/// <reference types="multer" />
import { User, user_filesIMAGE, user_filesMUSIC, user_filesOTHER, user_filesVIDEO } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";
export declare const CreateDir: (DirName: string, InDir?: string) => Promise<unknown>;
declare type FilesTypes = 'Video' | 'Image' | 'Music' | 'Other';
declare type ErrorsInUploadFile = 'unexpected' | 'bigSize' | 'fileType' | 'null';
export declare const UploadFile: (File: any, UserId: number, Type: FilesTypes, InDir: string, Name1: any | undefined) => {
    name: string;
    error: ErrorsInUploadFile;
}, GetFileType: (file: Express.Multer.File) => FilesTypes;
export declare function Hash(string: string, salt?: string): Promise<string>;
interface ClientInfo {
    surname: string;
    avatar: string;
    birthday: string;
    friends: string;
    subscribers: string;
    favorite_books: string;
    favorite_films: string;
    favorite_games: string;
    favorite_meals: string;
    description: string;
    family_status: string;
    place_of_residence: string;
    attitude_to_smocking: string;
    attitude_to_sport: string;
    attitude_to_alcohol: string;
    dreams: string;
}
export declare class UserService {
    private UserRepository;
    private user_filesMusic;
    private user_filesImage;
    private user_filesOther;
    private user_filesVideo;
    constructor(UserRepository: typeof User, user_filesMusic: typeof user_filesMUSIC, user_filesImage: typeof user_filesIMAGE, user_filesOther: typeof user_filesOTHER, user_filesVideo: typeof user_filesVIDEO);
    CheckUser(UserId: number, UserPassword: string): Promise<number>;
    SignUpUser(dto: CreateUserDto, response: Response): Promise<void | "{\"status\": \"500\", \"message\": \"NoValid!\"}" | "{\"status\": \"200\", \"message\": \"Error: non-unique data!\"}">;
    LogInByLogin(login: string, password: string, response: Response): Promise<string>;
    LogInByEmail(email: string, password: string, response: Response): Promise<string>;
    CheckPassword(password: string): Promise<unknown>;
    CheckLoginForBusy(login: string): Promise<unknown>;
    CheckEmailForBusy(email: any): Promise<unknown>;
    UploadAvatar(UserId: number, UserPassword: string, File: any): Promise<unknown>;
    UploadFile(UserId: number, UserPassword: string, File: any): Promise<unknown>;
    UploadMusic(UserId: number, UserPassword: string, File: Express.Multer.File): Promise<unknown>;
    GetMusic(SearchFrom: number, SearchTitle: string): Promise<unknown>;
    IncrementEavesdroppers(Dir: string): Promise<unknown>;
    GetThisPage(id: any): Promise<unknown>;
    GetYourFriends(id: number): Promise<unknown>;
    GetAllFriends(id: number): string | Promise<unknown>;
    GetSubscribers(id: number): string | Promise<unknown>;
    GetYourSubscribers(id: number): Promise<User>;
    RemoveFriend(Body: {
        ThisBody: number;
        UserId: number;
        UserPassword: string;
    }): Promise<unknown>;
    AddAFriend(ThisBody: number, UserId: number, UserPassword: string): Promise<unknown>;
    DeclineTheInvitation(ThisBody: number, UserId: number, UserPassword: string): Promise<unknown>;
    SendTheInvitation(ThisBody: number, UserId: number, UserPassword: string): Promise<unknown>;
    TakeBackFriendShipRequest(ThisBody: number, UserId: number, UserPassword: string): Promise<unknown>;
    GetOneUser(id: any): Promise<unknown>;
    ChangeInfo(UserId: number, UserPassword: string, NewInfo: ClientInfo): Promise<unknown>;
    ProfileIsFriend(UserId: number, ThisId: number): Promise<unknown>;
}
export {};
