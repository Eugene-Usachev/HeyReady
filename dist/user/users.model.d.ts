import { Model } from "sequelize-typescript";
interface UserCreationAttr {
    login: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    avatar: string | null;
    birthday: string | null;
    CountOfPostPack: 0;
    friends: string;
    subscribers: string;
    favorite_books: string | null;
    favorite_films: string | null;
    favorite_games: string | null;
    favorite_meals: string | null;
    description: string | null;
    family_status: string | null;
    place_of_residence: string | null;
    attitude_to_smocking: string | null;
    attitude_to_sport: string | null;
    attitude_to_alcohol: string | null;
    dreams: string | null;
}
export declare class User extends Model<User, UserCreationAttr> {
    id: number;
    login: string;
    password: string;
    name: string;
    surname: string;
    friends: string;
    subscribers: string;
    avatar: string;
    birthday: string;
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
    email: string;
    CountOfPostPack: number;
}
interface user_filesIMAGE_CreationAttr {
    name: string;
    dir: string;
    date: number;
}
export declare class user_filesIMAGE extends Model<user_filesIMAGE, user_filesIMAGE_CreationAttr> {
    id: number;
    name: string;
    dir: string;
    date: number;
}
interface user_filesVIDEO_CreationAttr {
    name: string;
    dir: string;
    date: number;
}
export declare class user_filesVIDEO extends Model<user_filesVIDEO, user_filesVIDEO_CreationAttr> {
    id: number;
    name: string;
    dir: string;
    date: number;
}
interface user_filesMUSIC_CreationAttr {
    name: string;
    dir: string;
    date: string;
    number_of_eavesdroppers: number;
}
export declare class user_filesMUSIC extends Model<user_filesMUSIC, user_filesMUSIC_CreationAttr> {
    id: number;
    name: string;
    dir: string;
    date: string;
    number_of_eavesdroppers: number;
}
interface user_filesOTHER_CreationAttr {
    name: string;
    dir: string;
    date: number;
    number_of_eavesdroppers: boolean;
}
export declare class user_filesOTHER extends Model<user_filesOTHER, user_filesOTHER_CreationAttr> {
    id: number;
    name: string;
    dir: string;
    date: number;
    danger: boolean;
}
export {};
