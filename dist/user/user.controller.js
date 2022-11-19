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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(userDto, response) {
        return this.userService.SignUpUser(userDto, response);
    }
    loginByLogin(Body, response) {
        return this.userService.LogInByLogin(Body.login.toString(), Body.password.toString(), response);
    }
    loginByEmail(Body, response) {
        return this.userService.LogInByEmail(Body.email.toString(), Body.password.toString(), response);
    }
    checkEmail(email) {
        return this.userService.CheckEmailForBusy(email);
    }
    checkLogin(login) {
        return this.userService.CheckLoginForBusy(login.toString());
    }
    checkPassword(password) {
        return this.userService.CheckPassword(decodeURIComponent(password.toString()));
    }
    uploadAvatar(files, Body) {
        if (!Body.UserId || !Body.UserPassword || isNaN(Number(Body.UserId)) || !files.file) {
            return '{"status": 400}';
        }
        return this.userService.UploadAvatar(Number(Body.UserId), String(Body.UserPassword), files);
    }
    uploadFile(file, Body) {
        if (!Body.UserId || !Body.UserPassword || isNaN(Number(Body.UserId)) || !file.file) {
            return '{"status": 400}';
        }
        return this.userService.UploadFile(Number(Body.UserId), String(Body.UserPassword), file.file[0]);
    }
    uploadMusic(file, Body) {
        if (!Body.UserId || !Body.UserPassword || isNaN(Number(Body.UserId)) || !file.file) {
            return '{"status": 400}';
        }
        return this.userService.UploadMusic(Number(Body.UserId), String(Body.UserPassword), file.file[0]);
    }
    getMusic(SearchTitle, SearchFrom) {
        return this.userService.GetMusic(Number(SearchFrom), String(SearchTitle));
    }
    incrementEavesdroppers(Body) {
        if (Body.dir !== undefined && Body.dir !== null) {
            return this.userService.IncrementEavesdroppers(Body.dir.toString());
        }
        return;
    }
    getThisPage(id) {
        try {
            return this.userService.GetThisPage(Number(id));
        }
        catch (err) {
            return JSON.stringify({ status: 400, message: "no user" });
        }
    }
    getYourFriends(id) {
        return this.userService.GetYourFriends(Number(id));
    }
    getAllFriends(id) {
        return this.userService.GetAllFriends(Number(id));
    }
    getSubscribers(id) {
        return this.userService.GetSubscribers(Number(id));
    }
    getYourSubscribers(id) {
        return this.userService.GetYourSubscribers(Number(id));
    }
    removeFriend(Body) {
        return this.userService.RemoveFriend(Body);
    }
    addAFriend(Body) {
        return this.userService.AddAFriend(Number(Body.ThisBody), Number(Body.UserId), String(Body.UserPassword));
    }
    declineTheInvitation(Body) {
        return this.userService.DeclineTheInvitation(Number(Body.ThisBody), Number(Body.UserId), String(Body.UserPassword));
    }
    sendTheInvitation(Body) {
        return this.userService.SendTheInvitation(Number(Body.ThisBody), Number(Body.UserId), String(Body.UserPassword));
    }
    takeBackFriendShipRequest(Body) {
        return this.userService.TakeBackFriendShipRequest(Number(Body.ThisBody), Number(Body.UserId), String(Body.UserPassword));
    }
    isFriend(Body) {
        return this.userService.ProfileIsFriend(Number(Body.UserId), Number(Body.ThisId));
    }
    getById(id) {
        return this.userService.GetOneUser(Number(id.id));
    }
    changeInfo(Body) {
        if (Number(Body.UserId) !== Number(Body.ThisId)) {
            return '{"status": 401}';
        }
        return this.userService.ChangeInfo(Number(Body.UserId), String(Body.UserPassword), Body.NewInfo);
    }
};
__decorate([
    (0, common_1.Post)('/SignUp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/LoginByLogin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "loginByLogin", null);
__decorate([
    (0, common_1.Post)("/LoginByEmail"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "loginByEmail", null);
__decorate([
    (0, common_1.Get)('/checkEmailForBusy/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Get)('/checkLoginForBusy/:login'),
    __param(0, (0, common_1.Param)('login')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkLogin", null);
__decorate([
    (0, common_1.Get)('/checkPassword/:password'),
    __param(0, (0, common_1.Param)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkPassword", null);
__decorate([
    (0, common_1.Post)('/File/UploadAvatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)('/File/UploadFile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('/File/UploadMusic'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadMusic", null);
__decorate([
    (0, common_1.Get)('/Music/GetMusic'),
    __param(0, (0, common_1.Query)('SearchTitle')),
    __param(1, (0, common_1.Query)('SearchFrom')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMusic", null);
__decorate([
    (0, common_1.Post)('/Music/IncrementEavesdroppers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "incrementEavesdroppers", null);
__decorate([
    (0, common_1.Get)('/friends/ThisProfile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getThisPage", null);
__decorate([
    (0, common_1.Get)('/friends/GetYourFriends/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getYourFriends", null);
__decorate([
    (0, common_1.Get)('/friends/GetAllFriends/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllFriends", null);
__decorate([
    (0, common_1.Get)('friends/GetSubscribers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getSubscribers", null);
__decorate([
    (0, common_1.Get)('friends/GetYourSubscribers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getYourSubscribers", null);
__decorate([
    (0, common_1.Post)("friends/RemoveFriend"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeFriend", null);
__decorate([
    (0, common_1.Post)('friends/AddAFriend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addAFriend", null);
__decorate([
    (0, common_1.Post)('friends/DeclineTheInvitation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "declineTheInvitation", null);
__decorate([
    (0, common_1.Post)('/friends/SendTheInvitation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendTheInvitation", null);
__decorate([
    (0, common_1.Post)('/friends/TakeBackFriendShipRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "takeBackFriendShipRequest", null);
__decorate([
    (0, common_1.Post)('/profile/IsFriend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "isFriend", null);
__decorate([
    (0, common_1.Get)('/profile/GetInfo/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('/profile/ChangeInfo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changeInfo", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map