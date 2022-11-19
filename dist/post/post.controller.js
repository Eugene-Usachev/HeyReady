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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(PostService) {
        this.PostService = PostService;
    }
    create(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.UserPost)
            return '{"status": 400}';
        if (isNaN(+Body.UserId))
            return '{"status": 400}';
        try {
            return this.PostService.CreatePost(+Body.UserId, String(Body.UserPassword), Body.UserPost);
        }
        catch (err) {
            return "err";
        }
    }
    getPost(Body) {
        if (!Body.AuthorId || !Body.number)
            return '{"status": 400}';
        if (isNaN(+Body.AuthorId) || isNaN(+Body.number))
            return '{"status": 400}';
        try {
            return this.PostService.GetPostByUserId(Body.AuthorId, Body.number && Body.number > 0 ? Body.number : 1);
        }
        catch (err) {
            return "err";
        }
    }
    deletePost(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost))
            return '{"status": 400}';
        return this.PostService.DeletePost(+Body.UserId, String(Body.UserPassword), +Body.NumberOfPost, +Body.NumberOfPack);
    }
    likePost(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.Author)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.Author))
            return '{"status": 400}';
        try {
            return this.PostService.LikePost(+Body.UserId, String(Body.UserPassword), +Body.NumberOfPost, +Body.NumberOfPack, +Body.Author);
        }
        catch (err) {
            return "err";
        }
    }
    unlikePost(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || Body.NumberOfPost == undefined || !Body.Author)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.Author))
            return '{"status": 400}';
        try {
            return this.PostService.UnLikePost(+Body.UserId, String(Body.UserPassword), +Body.NumberOfPost, +Body.NumberOfPack, +Body.Author);
        }
        catch (err) {
            return "err";
        }
    }
    dislikePost(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.Author)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.Author))
            return '{"status": 400}';
        try {
            return this.PostService.DislikePost(+Body.UserId, String(Body.UserPassword), +Body.NumberOfPost, +Body.NumberOfPack, +Body.Author);
        }
        catch (err) {
            return "err";
        }
    }
    undislikePost(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.Author)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.Author))
            return '{"status": 400}';
        try {
            return this.PostService.UnDislikePost(+Body.UserId, String(Body.UserPassword), +Body.NumberOfPost, +Body.NumberOfPack, +Body.Author);
        }
        catch (err) {
            return "err";
        }
    }
    addComment(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.Author || !Body.Comment)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.Author))
            return '{"status": 400}';
        if (Body.Comment.likedBy == null || Body.Comment.Number == null || Body.Comment.dislikedBy == null || Body.Comment.likes == null ||
            Body.Comment.dislikes == null || Body.Comment.content == null || Body.Comment.authorId == null || Body.Comment.date == null ||
            Body.Comment.authorName == null) {
            return '{"status": 400}';
        }
        return this.PostService.AddComment(+Body.UserId, String(Body.UserPassword), +Body.Author, +Body.NumberOfPost, +Body.NumberOfPack, Body.Comment);
    }
    deleteComment(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.AuthorOfPost || Body.NumberOfComment == undefined)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost) || isNaN(+Body.NumberOfComment))
            return '{"status": 400}';
        return this.PostService.DeleteComment(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack, +Body.NumberOfComment);
    }
    likeComment(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.AuthorOfPost || Body.NumberOfComment == undefined)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost) || isNaN(+Body.NumberOfComment))
            return '{"status": 400}';
        return this.PostService.LikeComment(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack, +Body.NumberOfComment);
    }
    dislikeComment(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.AuthorOfPost || Body.NumberOfComment == undefined)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost) || isNaN(+Body.NumberOfComment))
            return '{"status": 400}';
        return this.PostService.DislikeComment(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack, +Body.NumberOfComment);
    }
    unlikeComment(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.AuthorOfPost || Body.NumberOfComment == undefined)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost) || isNaN(+Body.NumberOfComment))
            return '{"status": 400}';
        return this.PostService.UnLikeComment(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack, +Body.NumberOfComment);
    }
    undislikeComment(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.AuthorOfPost || Body.NumberOfComment == undefined)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost) || isNaN(+Body.NumberOfComment))
            return '{"status": 400}';
        return this.PostService.UnDislikeComment(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack, +Body.NumberOfComment);
    }
    getComments(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || !Body.NumberOfPost || !Body.AuthorOfPost)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost))
            return '{"status": 400}';
        return this.PostService.GetComments(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack);
    }
    VoteInSurvey(Body) {
        if (!Body.UserId || !Body.UserPassword || !Body.NumberOfPack || Body.NumberOfPost == undefined || !Body.AuthorOfPost || !Body.VotedFor)
            return '{"status": 400}';
        if (isNaN(+Body.UserId) || isNaN(+Body.NumberOfPack) || isNaN(+Body.NumberOfPost) || isNaN(+Body.AuthorOfPost))
            return '{"status": 400}';
        return this.PostService.VoteInSurvey(+Body.UserId, String(Body.UserPassword), +Body.AuthorOfPost, +Body.NumberOfPost, +Body.NumberOfPack, Body.VotedFor);
    }
};
__decorate([
    (0, common_1.Post)('/AddNewPost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/GetPosts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)('/DeletePost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('/LikePost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "likePost", null);
__decorate([
    (0, common_1.Post)('/UnLikePost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "unlikePost", null);
__decorate([
    (0, common_1.Post)('/DislikePost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "dislikePost", null);
__decorate([
    (0, common_1.Post)('/UnDislikePost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "undislikePost", null);
__decorate([
    (0, common_1.Post)('/AddComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('/DeleteComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Post)('/LikeComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "likeComment", null);
__decorate([
    (0, common_1.Post)('/DislikeComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "dislikeComment", null);
__decorate([
    (0, common_1.Post)('/UnLikeComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "unlikeComment", null);
__decorate([
    (0, common_1.Post)('/UnDislikeComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "undislikeComment", null);
__decorate([
    (0, common_1.Post)('/GetComments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getComments", null);
__decorate([
    (0, common_1.Post)('/VoteInSurvey'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "VoteInSurvey", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map