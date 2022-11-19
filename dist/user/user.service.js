"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.Hash = exports.GetFileType = exports.UploadFile = exports.CreateDir = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const sequelize_1 = require("@nestjs/sequelize");
const crypto = require("crypto");
const util = require("util");
const sequelize_2 = require("sequelize");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const CreateDir = (DirName, InDir) => {
    return new Promise((res, rej) => {
        let FilePath;
        if (InDir) {
            FilePath = path.resolve(__dirname, '..', 'UserFiles', InDir, DirName);
        }
        else {
            FilePath = path.resolve(__dirname, '..', 'UserFiles', DirName);
        }
        try {
            if (!fs.existsSync(FilePath)) {
                fs.mkdirSync(FilePath, { recursive: true });
                return res('created');
            }
            else {
                return res('exist');
            }
        }
        catch (err) {
            return rej('{"status": 500}');
        }
    }).catch((err) => { return '{"status": 500}'; });
};
exports.CreateDir = CreateDir;
const AllowImageTypes = ['jpg', 'png', 'jpeg', 'gif'], CheckImageType = (Type) => {
    return AllowImageTypes.indexOf(Type) != -1;
}, AllowMusicTypes = ['mp3', 'png', 'jpeg'], CheckMusicType = (Type) => {
    return AllowMusicTypes.indexOf(Type) != -1;
}, AllowVideoTypes = ['mp4'], CheckVideoType = (Type) => {
    return AllowVideoTypes.indexOf(Type) != -1;
}, AllowFileSize = 1024 * 1024 * 50, CheckFileSize = (Size) => {
    return Size < AllowFileSize - 1;
};
const UploadFile = (File, UserId, Type, InDir, Name1) => {
    try {
        let Name;
        if (Name1 === undefined) {
            Name = uuid.v4() + '.' + File.originalname.split('.').pop();
        }
        else {
            Name = Name1;
        }
        const FilePath = path.resolve(__dirname, '..', '..', 'UserFiles', String(UserId), InDir);
        switch (Type) {
            case 'Image':
                if (CheckFileSize(File.size)) {
                    if (CheckImageType(File.originalname.split('.').pop())) {
                        try {
                            if (!fs.existsSync(FilePath)) {
                                fs.mkdirSync(FilePath, { recursive: true });
                            }
                            fs.writeFileSync(path.resolve(FilePath, String(Name)), File.buffer);
                            return { name: String(Name), error: 'null' };
                        }
                        catch (e) {
                            return e;
                        }
                    }
                    else {
                        return { name: '', error: 'fileType' };
                    }
                }
                else {
                    return { name: '', error: 'bigSize' };
                }
            case 'Music':
                if (CheckFileSize(File.size)) {
                    if (CheckMusicType(File.originalname.split('.').pop())) {
                        try {
                            if (!fs.existsSync(FilePath)) {
                                fs.mkdirSync(FilePath, { recursive: true });
                            }
                            fs.writeFileSync(path.resolve(FilePath, String(Name)), File.buffer);
                            return { name: String(Name), error: 'null' };
                        }
                        catch (e) {
                            return e;
                        }
                    }
                    else {
                        return { name: '', error: 'fileType' };
                    }
                }
                else {
                    return { name: '', error: 'bigSize' };
                }
            case "Video":
                if (CheckFileSize(File.size)) {
                    if (CheckVideoType(File.originalname.split('.').pop())) {
                        try {
                            if (!fs.existsSync(FilePath)) {
                                fs.mkdirSync(FilePath, { recursive: true });
                            }
                            fs.writeFileSync(path.resolve(FilePath, String(Name)), File.buffer);
                            return { name: String(Name), error: 'null' };
                        }
                        catch (e) {
                            return e;
                        }
                    }
                    else {
                        return { name: '', error: 'fileType' };
                    }
                }
                else {
                    return { name: '', error: 'bigSize' };
                }
            case "Other":
                if (CheckFileSize(File.size)) {
                    try {
                        if (!fs.existsSync(FilePath)) {
                            fs.mkdirSync(FilePath, { recursive: true });
                        }
                        fs.writeFileSync(path.resolve(FilePath, String(Name)), File.buffer);
                        return { name: String(Name), error: 'null' };
                    }
                    catch (e) {
                        return e;
                    }
                }
                else {
                    return { name: '', error: 'fileType' };
                }
            default:
                if (CheckFileSize(File.size)) {
                    try {
                        fs.writeFileSync(path.resolve(FilePath, String(Name)), File.buffer);
                        return { name: String(Name), error: 'null' };
                    }
                    catch (e) {
                        return { name: '', error: 'bigSize' };
                    }
                }
                else {
                    return { name: '', error: 'fileType' };
                }
        }
    }
    catch (e) {
        return { name: '', error: 'unexpected' };
    }
}, GetFileType = (file) => {
    const FileType = file.originalname.split('.').pop();
    if (AllowImageTypes.indexOf(FileType) !== -1)
        return 'Image';
    if (AllowVideoTypes.indexOf(FileType) !== -1)
        return 'Video';
    if (AllowMusicTypes.indexOf(FileType) !== -1)
        return 'Music';
    else {
        return 'Other';
    }
};
exports.UploadFile = UploadFile, exports.GetFileType = GetFileType;
async function Hash(string, salt = process.env.SALT) {
    const NewString = decodeURIComponent(string);
    const buffer = await util.promisify(crypto.scrypt)(NewString, salt, 32);
    return `${buffer.toString('hex')}`;
}
exports.Hash = Hash;
async function CheckForValid(value, NormalLength = 127) {
    if (value.length > NormalLength) {
        return false;
    }
    for (let char of value) {
        if (!(/[a-zA-Z\d&$@!._-]/.test(char))) {
            return false;
        }
    }
    return true;
}
let UserService = class UserService {
    constructor(UserRepository, user_filesMusic, user_filesImage, user_filesOther, user_filesVideo) {
        this.UserRepository = UserRepository;
        this.user_filesMusic = user_filesMusic;
        this.user_filesImage = user_filesImage;
        this.user_filesOther = user_filesOther;
        this.user_filesVideo = user_filesVideo;
    }
    async CheckUser(UserId, UserPassword) {
        try {
            return await this.UserRepository.count({
                where: { id: UserId, password: await Hash(UserPassword) }
            });
        }
        catch (err) {
            return 0;
        }
    }
    async SignUpUser(dto, response) {
        try {
            if (!await CheckForValid(dto.login, 63) || !await CheckForValid(dto.email, 63)) {
                return '{"status": "500", "message": "NoValid!"}';
            }
            const PASSWORDDONOTTOUCH = dto.password;
            dto.password = await Hash(PASSWORDDONOTTOUCH);
            return await this.UserRepository.create(dto).then((NoNPromise) => {
                response.cookie("id", NoNPromise.id);
                response.cookie("login", NoNPromise.login);
                response.cookie("password", PASSWORDDONOTTOUCH);
                response.cookie("email", NoNPromise.email);
                response.cookie('name', NoNPromise.name);
                response.cookie('avatar', 'NULL.png');
                response.cookie('surname', NoNPromise.surname);
                (0, exports.CreateDir)(String(NoNPromise.id));
                (0, exports.CreateDir)('Music', String(NoNPromise.id));
                (0, exports.CreateDir)('Image', String(NoNPromise.id));
                (0, exports.CreateDir)('Video', String(NoNPromise.id));
                (0, exports.CreateDir)('Other', String(NoNPromise.id));
                response.json({ status: "201", message: "kk", newId: NoNPromise.id });
            });
        }
        catch (err) {
            return '{"status": "200", "message": "Error: non-unique data!"}';
        }
    }
    async LogInByLogin(login, password, response) {
        try {
            return await this.UserRepository.findOne({
                attributes: ['id', 'password', 'email', 'avatar', 'name', 'surname'],
                where: { login: login }
            }).then(async (Res) => {
                if (Res.id) {
                    if (Res.password == await Hash(password)) {
                        response.cookie("id", Res.id);
                        response.cookie("login", login);
                        response.cookie("password", password);
                        response.cookie("email", Res.email);
                        response.cookie('name', Res.name);
                        response.cookie('surname', Res.surname);
                        response.cookie('avatar', Res.id + '/Image/' + decodeURIComponent(Res.avatar));
                        response.json({ status: "200", Message: "kk" });
                    }
                    else {
                        response.json({ status: "200", Message: "Bad password" });
                    }
                }
                else {
                    return '{"status": "200", "Message": "invalid Info"}';
                }
            });
        }
        catch (err) {
            return '{"status": "200", "Message": "invalid Info"}';
        }
    }
    async LogInByEmail(email, password, response) {
        try {
            return await this.UserRepository.findOne({
                attributes: ['id', 'password', "login", "avatar", "name", "surname"],
                where: { email: email }
            }).then(async (Res) => {
                if (Res.id) {
                    if (Res.password == await Hash(decodeURIComponent(password))) {
                        response.cookie("id", Res.id);
                        response.cookie("login", Res.login);
                        response.cookie("password", decodeURIComponent(password));
                        response.cookie("email", email);
                        response.cookie('name', Res.name);
                        response.cookie('surname', Res.surname);
                        response.cookie('avatar', Res.id + '/Image/' + decodeURIComponent(Res.avatar));
                        response.json({ status: "200", Message: "kk" });
                    }
                    else {
                        response.json({ status: "200", Message: "Bad password" });
                    }
                }
                else {
                    return '{"status": "200", "Message": "invalid Info"}';
                }
            });
        }
        catch (err) {
            return '{"status": "200", "Message": "invalid Info"}';
        }
    }
    CheckPassword(password) {
        return new Promise((res, rej) => {
            try {
                if (password.search(/\d/) == -1) {
                    return res('{"status": "200", "message":"Добавьте цифру"}');
                }
                if (password.length < 8) {
                    return res('{"status": "200", "message":"Пароль слишком короткий"}');
                }
                if (password.length > 30) {
                    return res('{"status": "200", "message":"Пароль слишком длинный"}');
                }
                let strl = false, strh = false, other = false;
                for (let char of password) {
                    if (!(/[a-zA-Z\d&$@!._-]/.test(char))) {
                        return res('{"status": "200", "message":"Только буквы английского алфавита, цифры и специальные символы (&$@!-_)!"}');
                    }
                    if (!other && (char == "&" || char == "$") || char == "@" || char == "!" || char == "-" || char == "_") {
                        other = true;
                    }
                    else {
                        if (!strh || !strl) {
                            if ((char.toUpperCase() == char) && (isNaN(Number(char)))) {
                                strh = true;
                            }
                            else {
                                if (isNaN(Number(char))) {
                                    strl = true;
                                }
                            }
                        }
                    }
                }
                if (!strh) {
                    return res('{"status": "200", "message":"Добавьте заглавную букву"}');
                }
                if (!strl) {
                    return res('{"status": "200", "message":"Добавьте строчную букву"}');
                }
                if (!other) {
                    return res('{"status": "200", "message":"Добавьте специальные символы (&$@!)"}');
                }
                return res('{"status": "200", "message":"kk"}');
            }
            catch (err) {
                rej(`{"status": "500", "message":"Error: ${err}"}`);
            }
        });
    }
    CheckLoginForBusy(login) {
        return new Promise((res, rej) => {
            if (login.length > 63) {
                return res('{"status": "200", "Message": "Too Long"}');
            }
            this.UserRepository.count({
                where: { login: login }
            }).then(Res => {
                if (Res > 0) {
                    return res('{"status": "200","Message": "This login is busy"}');
                }
                else {
                    return res('{"status": "200", "Message": "kk"}');
                }
            }).catch(err => {
                return rej(`{"status": "500","message": "${err}"}`);
            });
        });
    }
    CheckEmailForBusy(email) {
        return new Promise((res, rej) => {
            if (email.length > 63) {
                return res('{"status": "200", "Message": "Too Long"}');
            }
            this.UserRepository.count({
                where: { email: email.toString() }
            }).then((Res) => {
                if (Res > 0) {
                    return res('{"status": "200","Message": "This email is busy"}');
                }
                else {
                    return res('{"status": "200", "Message": "kk"}');
                }
            }).catch(err => {
                return rej(`{"status": "500","message": "${err}"}`);
            });
        });
    }
    UploadAvatar(UserId, UserPassword, File) {
        return new Promise(async (res, rej) => {
            if (await this.CheckUser(UserId, UserPassword) === 0) {
                return res('{"status": 401}');
            }
            const AvatarState = (0, exports.UploadFile)(File.file[0], UserId, 'Image', 'Image', undefined);
            switch (AvatarState.error) {
                case "bigSize":
                    return res('{"status": 400, "message": "bigSize"}');
                case "fileType":
                    return res('{"status": 400, "message": "fileType"}');
                case "unexpected":
                    return res('{"status": 500}');
                case "null":
                    this.UserRepository.update({ avatar: `${AvatarState.name}` }, { where: { id: UserId } })
                        .then(() => { return res('{"status": 204, "message": "' + AvatarState.name + '"}'); })
                        .catch(() => { return res('{"status": 500}'); });
                    break;
            }
        }).catch(() => { return '{"status": 500}'; });
    }
    UploadFile(UserId, UserPassword, File) {
        return new Promise(async (res, rej) => {
            if (await this.CheckUser(UserId, UserPassword) === 0) {
                return res('{"status": 401}');
            }
            const FileState = (0, exports.UploadFile)(File, UserId, (0, exports.GetFileType)(File), (0, exports.GetFileType)(File), undefined);
            switch (FileState.error) {
                case "bigSize":
                    return res('{"status": 400, "message": "bigSize"}');
                case "fileType":
                    return res('{"status": 400, "message": "fileType"}');
                case "unexpected":
                    return res('{"status": 500}');
                case "null":
                    return res('{"status": 204, "name": "' + FileState.name + '"}');
            }
        }).catch(() => { return '{"status": 500}'; });
    }
    UploadMusic(UserId, UserPassword, File) {
        return new Promise(async (res, rej) => {
            if (await this.CheckUser(UserId, UserPassword) === 0) {
                return res('{"status": 401}');
            }
            if ((0, exports.GetFileType)(File) !== 'Music') {
                return this.UploadFile(UserId, UserPassword, File);
            }
            const FileState = (0, exports.UploadFile)(File, UserId, (0, exports.GetFileType)(File), 'Music', undefined);
            switch (FileState.error) {
                case "bigSize":
                    return res('{"status": 400, "message": "bigSize"}');
                case "fileType":
                    return res('{"status": 400, "message": "fileType"}');
                case "unexpected":
                    return res('{"status": 500}');
                case "null":
                    {
                        const MusicName = File.originalname.split('.').slice(0, -1).join('');
                        this.user_filesMusic.create({ name: MusicName.toLowerCase(), dir: UserId + '/Music/' + FileState.name, date: (new Date()).toDateString(), number_of_eavesdroppers: 0 })
                            .then(() => { return res('{"status": 204, "name": "' + FileState.name + '"}'); })
                            .catch(() => { return res('{"status": 500}'); });
                    }
            }
        }).catch(() => { return '{"status": 500}'; });
    }
    GetMusic(SearchFrom, SearchTitle) {
        return new Promise((res, rej) => {
            if (!SearchTitle || SearchTitle === '') {
                return res('{"status": 400, "message": "No title"}');
            }
            const _SearchFrom = SearchFrom > 0 ? (SearchFrom - 1) * 40 : 0;
            this.user_filesMusic.findAll({
                where: {
                    name: {
                        [sequelize_2.Op.like]: `%${SearchTitle}%`
                    }
                },
                order: [
                    ['number_of_eavesdroppers', 'DESC']
                ],
                offset: _SearchFrom,
                limit: 40
            }).then((Res) => {
                if (Res === null || Res[0] === null || Res.length < 1) {
                    return res('{"status": 404, "message": "No songs"}');
                }
                const IsThereMore = Res.length > 40;
                res(JSON.stringify({
                    status: "200",
                    count: _SearchFrom + Res.length,
                    IsThereMore: IsThereMore,
                    array: Res
                }));
            }).catch(err => {
                return res('{"status": "500", "message": "Unexpected error"}');
            });
        });
    }
    IncrementEavesdroppers(Dir) {
        return new Promise((res) => {
            this.user_filesMusic.findOne({ attributes: ['number_of_eavesdroppers'], where: { dir: Dir } })
                .then(Res => {
                this.user_filesMusic.update({ number_of_eavesdroppers: Res.number_of_eavesdroppers + 1 }, { where: { dir: Dir } })
                    .then(() => { return res('{"status": 200}'); })
                    .catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    GetThisPage(id) {
        return new Promise((res, rej) => {
            this.UserRepository.findOne({
                attributes: ['avatar', 'friends', 'subscribers'],
                where: { id: id }
            }).then((Result) => {
                return res(JSON.stringify({
                    'avatar': Result['avatar'],
                    'json_friends': Result['friends'],
                    'json_subscribers': Result['subscribers'],
                }));
            }).catch(() => {
                return rej('{"status": "400", "Message": "No user!"}');
            });
        });
    }
    GetYourFriends(id) {
        return new Promise((res, rej) => {
            return this.UserRepository.findOne({
                attributes: ['friends'],
                where: { id: id }
            }).then((Res) => {
                if (Res.friends) {
                    return res(`{"status":"200", "Message":"kk", "Main":${JSON.stringify(Res.friends)}}`);
                }
                else {
                    return res(`{"status": "400", "Message":"No friends"}`);
                }
            }).catch((err) => {
                return res(`{"status": "400", "Message":"No friends"}`);
            });
        });
    }
    GetAllFriends(id) {
        if (id == 0) {
            return JSON.stringify({
                status: 400,
                count: null,
                array: null
            });
        }
        return new Promise((res, rej) => {
            this.UserRepository.findOne({
                attributes: ['friends'],
                where: { id: id }
            }).then(async (Res) => {
                const Response = JSON.parse(Res.friends);
                if (Response.count != null && Response.count > 0) {
                    let JsonToResponse;
                    if (Response.array.length > 0) {
                        JsonToResponse = {
                            count: Response.count,
                            array: []
                        };
                        for (let i = 0; i < Response.array.length; ++i) {
                            try {
                                const result = await this.UserRepository.findOne({
                                    attributes: ['avatar', 'name', 'surname', 'subscribers'],
                                    where: { id: Response.array[i] }
                                });
                                if (result.name && result.name != '' && result.name != null) {
                                    JsonToResponse.array.push({
                                        avatar: result.avatar,
                                        name: result.name,
                                        surname: result.surname,
                                        subscribers: result.subscribers,
                                        id: Response.array[i]
                                    });
                                }
                            }
                            catch (err) { }
                        }
                        return res(JSON.stringify({
                            status: 200,
                            message: 'kk',
                            json: JSON.stringify(JsonToResponse)
                        }));
                    }
                    else {
                        return res('{"status": "400", "Message":"No friends"}');
                    }
                }
                else {
                    return res('{"status": "400", "Message":"No friends"}');
                }
            }).catch(err => {
                return res('{"status": "400", "Message":"No friends"}');
            });
        });
    }
    GetSubscribers(id) {
        if (id == 0) {
            return JSON.stringify({
                status: 400,
                count: null,
                array: null
            });
        }
        return new Promise((res, rej) => {
            this.UserRepository.findOne({
                attributes: ['subscribers'],
                where: { id: id }
            }).then(async (Res) => {
                const Response = JSON.parse(Res.subscribers);
                if (Response.count != null && Response.count > 0) {
                    let JsonToResponse;
                    if (Response.array.length > 0) {
                        JsonToResponse = {
                            count: Response.count,
                            array: []
                        };
                        for (let i = 0; i < Response.array.length; ++i) {
                            try {
                                const result = await this.UserRepository.findOne({
                                    attributes: ['avatar', 'name', 'surname', 'subscribers'],
                                    where: { id: Response.array[i] }
                                });
                                if (result.name && result.name != '' && result.name != null) {
                                    JsonToResponse.array.push({
                                        avatar: result.avatar,
                                        name: result.name,
                                        surname: result.surname,
                                        subscribers: result.subscribers,
                                        id: Response.array[i]
                                    });
                                }
                            }
                            catch (err) { }
                        }
                        return res(JSON.stringify({
                            status: 200,
                            message: 'kk',
                            json: JSON.stringify(JsonToResponse)
                        }));
                    }
                    else {
                        return res('{"status": "400", "message":"No subscribers"}');
                    }
                }
                else {
                    return res('{"status": "400", "message":"No subscribers"}');
                }
            }).catch((err) => {
                return res('{"status": "500", "message":"Err"}');
            });
        });
    }
    async GetYourSubscribers(id) {
        return await this.UserRepository.findOne({
            attributes: ['subscribers'],
            where: { id: id }
        });
    }
    RemoveFriend(Body) {
        return new Promise(async (res, rej) => {
            const user = await this.UserRepository.findOne({
                attributes: ['friends', 'subscribers'],
                where: { id: Number(Body.UserId), password: await Hash(decodeURIComponent(Body.UserPassword)) }
            });
            try {
                if (!user.friends) {
                    return res('{"status":"401"}');
                }
            }
            catch (err) {
                return res('{"status":"401"}');
            }
            const ThisBody = await this.UserRepository.findOne({
                attributes: ['friends', 'subscribers'],
                where: { id: Body.ThisBody }
            });
            try {
                const UserFriends = JSON.parse(user.friends), UserSubscribers = JSON.parse(user.subscribers), FriendIdIndex = UserFriends.array.indexOf(Number(Body.ThisBody)), ThisBodyFriends = JSON.parse(ThisBody.friends), ThisBodyIndexOfUserId = ThisBodyFriends.array.indexOf(Number(Body.UserId));
                if (FriendIdIndex === -1 || ThisBodyIndexOfUserId === -1) {
                    return res('{"status":"500", "message": "RF1"}');
                }
                UserFriends.array.splice(FriendIdIndex, 1);
                UserFriends.count -= 1;
                UserSubscribers.count += 1;
                UserSubscribers.array.unshift(Number(Body.ThisBody));
                ThisBodyFriends.array.splice(ThisBodyIndexOfUserId, 1);
                ThisBodyFriends.count -= 1;
                this.UserRepository.update({ friends: JSON.stringify(ThisBodyFriends) }, { where: { id: Body.ThisBody } });
                this.UserRepository.update({ friends: JSON.stringify(UserFriends), subscribers: JSON.stringify(UserSubscribers) }, { where: { id: Body.UserId } }).then(() => {
                    return res('{"status":"200", "response": "kk"}');
                }).catch((err) => { return res('{"status":"500", "response": "RF2"}'); });
            }
            catch (err) {
                return res('{"status":"500", "response": "RF2"}');
            }
        });
    }
    AddAFriend(ThisBody, UserId, UserPassword) {
        return new Promise(async (res, rej) => {
            this.UserRepository.findOne({
                attributes: ["friends", "subscribers"],
                where: { id: UserId, password: await Hash(decodeURIComponent(UserPassword)) }
            }).then(async (Res) => {
                try {
                    if (Res === null) {
                        return res('{"status":"401"}');
                    }
                }
                catch (err) {
                    return res('{"status":"401"}');
                }
                const ThisBody2 = await this.UserRepository.findOne({
                    attributes: ['friends', 'subscribers'],
                    where: { id: ThisBody }
                });
                const ThisBodyFriends = JSON.parse(ThisBody2.friends);
                if (ThisBodyFriends.array.indexOf(Number(UserId)) !== -1) {
                    return res('{"status":"500", "message": "User are not a Subscriber"}');
                }
                const Subscribers = JSON.parse(Res.subscribers), Friends = JSON.parse(Res.friends);
                Subscribers.count -= 1;
                try {
                    Subscribers.array.splice(Subscribers.array.indexOf(ThisBody), 1);
                }
                catch (err) {
                    return res('{"status":"500", "message": "RF2"}');
                }
                ThisBodyFriends.count += 1;
                ThisBodyFriends.array.unshift(UserId);
                Friends.count += 1;
                Friends.array.unshift(ThisBody);
                this.UserRepository.update({ friends: JSON.stringify(ThisBodyFriends) }, { where: { id: ThisBody } });
                this.UserRepository.update({ friends: JSON.stringify(Friends), subscribers: JSON.stringify(Subscribers) }, { where: { id: UserId } }).then(() => {
                    return res('{"status":"200", "response": "kk"}');
                }).catch((err) => {
                    return res('{"status":"500", "response": "RF2"}');
                });
            }).catch((err) => {
                return res('{"status":"500", "response": "Unexpected error"}');
            });
        }).catch((err) => { return '{"status":500}'; });
    }
    DeclineTheInvitation(ThisBody, UserId, UserPassword) {
        return new Promise(async (res, rej) => {
            this.UserRepository.findOne({
                attributes: ["friends", "subscribers"],
                where: { id: UserId, password: await Hash(decodeURIComponent(UserPassword)) }
            }).then((Res) => {
                try {
                    if (Res === null) {
                        return res('{"status":"401"}');
                    }
                }
                catch (err) {
                    return res('{"status":"401"}');
                }
                const Subscribers = JSON.parse(Res.subscribers), Friends = JSON.parse(Res.friends);
                Subscribers.count -= 1;
                try {
                    Subscribers.array.splice(Subscribers.array.indexOf(ThisBody), 1);
                }
                catch (err) {
                    return res('{"status":"400", "message": "User are not a Subscriber"}');
                }
                this.UserRepository.update({ subscribers: JSON.stringify(Subscribers) }, { where: { id: UserId } }).then(() => {
                    return res('{"status":"200", "response": "kk"}');
                }).catch((err) => { return res('{"status":"500", "response": "RF2"}'); });
            }).catch((err) => {
                return res('{"status":"500", "response": "Unexpected error"}');
            });
        });
    }
    SendTheInvitation(ThisBody, UserId, UserPassword) {
        return new Promise(async (res, rej) => {
            this.UserRepository.count({
                where: { id: UserId, password: await Hash(decodeURIComponent(UserPassword)) }
            }).then((Res) => {
                try {
                    if (Res < 1) {
                        return res('{"status":"401"}');
                    }
                }
                catch (err) {
                    return res('{"status":"401"}');
                }
                this.UserRepository.findOne({
                    attributes: ['friends', 'subscribers'],
                    where: { id: ThisBody }
                }).then((Res) => {
                    if (Res == null) {
                        return res('{"status":"500"}');
                    }
                    const Subscribers = JSON.parse(Res.subscribers), Friends = JSON.parse(Res.friends);
                    if (Subscribers.array.indexOf(UserId) != -1) {
                        return res('{"status":"400", "message":"You are subscriber now!"}');
                    }
                    if (Friends.array.indexOf(UserId) != -1) {
                        return res('{"status":"400", "message":"You are friend now!"}');
                    }
                    Subscribers.count += 1;
                    Subscribers.array.unshift(UserId);
                    this.UserRepository.update({ subscribers: JSON.stringify(Subscribers) }, { where: { id: ThisBody } }).then(() => {
                        return res('{"status":"200", "response": "kk"}');
                    }).catch((err) => { return res('{"status":"500", "response": "Unexpected error"}'); });
                }).catch((err) => {
                    return res('{"status":"500", "response": "Unexpected error"}');
                });
            }).catch((err) => {
                return res('{"status":"500", "response": "Unexpected error"}');
            });
        });
    }
    TakeBackFriendShipRequest(ThisBody, UserId, UserPassword) {
        return new Promise(async (res, rej) => {
            this.UserRepository.count({
                where: { id: UserId, password: await Hash(decodeURIComponent(UserPassword)) }
            }).then((SecurityCount) => {
                try {
                    if (SecurityCount < 1) {
                        return res('{"status":"401"}');
                    }
                }
                catch (err) {
                    return res('{"status":"401"}');
                }
                this.UserRepository.findOne({
                    attributes: ["friends", "subscribers"],
                    where: { id: ThisBody }
                }).then((Res) => {
                    try {
                        if (Res === null) {
                            return res('{"status":"401"}');
                        }
                    }
                    catch (err) {
                        return res('{"status":"401"}');
                    }
                    const Subscribers = JSON.parse(Res.subscribers), Friends = JSON.parse(Res.friends);
                    if (Friends.array.indexOf(UserId) != -1) {
                        return res('{"status":"400", "message":"You are friend now!"}');
                    }
                    Subscribers.count -= 1;
                    try {
                        Subscribers.array.splice(Subscribers.array.indexOf(UserId), 1);
                    }
                    catch (err) {
                        return res('{"status":"400", "message": "User are not a Subscriber"}');
                    }
                    this.UserRepository.update({ subscribers: JSON.stringify(Subscribers) }, { where: { id: ThisBody } }).then(() => {
                        return res('{"status":"200", "response": "kk"}');
                    }).catch((err) => { return res('{"status":"500", "response": "Unexpected error"}'); });
                }).catch((err) => {
                    return res('{"status":"500", "response": "Unexpected error"}');
                });
            }).catch((err) => {
                return res('{"status":"500", "response": "Unexpected error"}');
            });
        });
    }
    GetOneUser(id) {
        return new Promise((res, rej) => {
            this.UserRepository.findOne({
                attributes: ["login", "name", "surname", "friends", "subscribers", "avatar", "birthday", "favorite_books", "favorite_films",
                    "favorite_games", "favorite_meals", "description",
                    "family_status", "place_of_residence", "attitude_to_smocking", "attitude_to_sport", "attitude_to_alcohol", "dreams"],
                where: { id: id }
            }).then(Res => {
                res(JSON.stringify({
                    status: 200,
                    object: {
                        login: Res.login,
                        name: Res.name,
                        surname: Res.surname,
                        avatar: Res.avatar,
                        birthday: Res.birthday,
                        friends: Res.birthday,
                        subscribers: Res.subscribers,
                        favorite_books: Res.favorite_books,
                        favorite_films: Res.favorite_films,
                        favorite_games: Res.favorite_games,
                        favorite_meals: Res.favorite_meals,
                        description: Res.description,
                        family_status: Res.family_status,
                        place_of_residence: Res.place_of_residence,
                        attitude_to_smocking: Res.attitude_to_smocking,
                        attitude_to_sport: Res.attitude_to_sport,
                        attitude_to_alcohol: Res.attitude_to_alcohol,
                        dreams: Res.dreams
                    }
                }));
            }).catch(err => res(`{"status": "500", "Message": "${err}"}`));
        });
    }
    ChangeInfo(UserId, UserPassword, NewInfo) {
        return new Promise(async (res, rej) => {
            if (await this.CheckUser(UserId, UserPassword) === 0) {
                return '{"status": 401}';
            }
            this.UserRepository.update(NewInfo, {
                where: { id: UserId }
            }).then(() => {
                res(JSON.stringify({
                    status: 200,
                    object: NewInfo
                }));
            }).catch(err => res('{"status": 500}'));
        }).catch(err => '{"status": 500}');
    }
    ProfileIsFriend(UserId, ThisId) {
        return new Promise((res, rej) => {
            this.UserRepository.findOne({
                attributes: ['subscribers'],
                where: { id: UserId }
            })
                .then((Res) => {
                let State = 'none';
                if (JSON.parse(Res.subscribers).array.indexOf(ThisId) != -1) {
                    State = 'subscriber';
                }
                this.UserRepository.findOne({
                    attributes: ["friends", "subscribers"],
                    where: { id: ThisId }
                })
                    .then((Res) => {
                    if (JSON.parse(Res.friends).array.indexOf(UserId) != -1) {
                        return res('{"status":200, "object": "friend"}');
                    }
                    else {
                        if (JSON.parse(Res.subscribers).array.indexOf(UserId) != -1) {
                            return res('{"status":200, "object": "idol"}');
                        }
                        else {
                            return res('{"status":200, "object": "' + State + '"}');
                        }
                    }
                })
                    .catch(() => {
                    return res('{"status":200, "object": "none"}');
                });
            })
                .catch(() => {
                return res('{"status":200, "object": "none"}');
            });
        }).catch(() => {
            return '{"status": 500}';
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.user_filesMUSIC)),
    __param(2, (0, sequelize_1.InjectModel)(users_model_1.user_filesIMAGE)),
    __param(3, (0, sequelize_1.InjectModel)(users_model_1.user_filesOTHER)),
    __param(4, (0, sequelize_1.InjectModel)(users_model_1.user_filesVIDEO)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map