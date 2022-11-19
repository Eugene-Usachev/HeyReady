import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userDto: CreateUserDto, response: any): Promise<void | "{\"status\": \"500\", \"message\": \"NoValid!\"}" | "{\"status\": \"200\", \"message\": \"Error: non-unique data!\"}">;
    loginByLogin(Body: {
        password: unknown;
        login: unknown;
    }, response: any): Promise<string>;
    loginByEmail(Body: {
        password: unknown;
        email: unknown;
    }, response: any): Promise<string>;
    checkEmail(email: any): Promise<unknown>;
    checkLogin(login: any): Promise<unknown>;
    checkPassword(password: string): Promise<unknown>;
    uploadAvatar(files: any, Body: {
        UserId: unknown;
        UserPassword: unknown;
    }): Promise<unknown> | "{\"status\": 400}";
    uploadFile(file: any, Body: {
        UserId: unknown;
        UserPassword: unknown;
    }): Promise<unknown> | "{\"status\": 400}";
    uploadMusic(file: any, Body: {
        UserId: unknown;
        UserPassword: unknown;
    }): Promise<unknown> | "{\"status\": 400}";
    getMusic(SearchTitle: any, SearchFrom: any): Promise<unknown>;
    incrementEavesdroppers(Body: {
        dir: unknown;
    }): Promise<unknown>;
    getThisPage(id: any): string | Promise<unknown>;
    getYourFriends(id: any): Promise<unknown>;
    getAllFriends(id: any): string | Promise<unknown>;
    getSubscribers(id: any): string | Promise<unknown>;
    getYourSubscribers(id: any): Promise<import("./users.model").User>;
    removeFriend(Body: {
        ThisBody: number;
        UserId: number;
        UserPassword: string;
    }): Promise<unknown>;
    addAFriend(Body: {
        ThisBody: any;
        UserId: any;
        UserPassword: any;
    }): Promise<unknown>;
    declineTheInvitation(Body: {
        ThisBody: any;
        UserId: any;
        UserPassword: any;
    }): Promise<unknown>;
    sendTheInvitation(Body: {
        ThisBody: any;
        UserId: any;
        UserPassword: any;
    }): Promise<unknown>;
    takeBackFriendShipRequest(Body: {
        ThisBody: any;
        UserId: any;
        UserPassword: any;
    }): Promise<unknown>;
    isFriend(Body: {
        UserId: number;
        ThisId: number;
    }): Promise<unknown>;
    getById(id: {
        id: any;
    }): Promise<unknown>;
    changeInfo(Body: {
        ThisId: number;
        UserPassword: string;
        UserId: number;
        NewInfo: any;
    }): Promise<unknown> | "{\"status\": 401}";
}
