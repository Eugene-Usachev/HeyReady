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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const post_model_1 = require("./post.model");
const users_model_1 = require("../user/users.model");
const user_service_1 = require("../user/user.service");
let PostService = class PostService {
    constructor(PostRepository, UserRepository, CommentRepository) {
        this.PostRepository = PostRepository;
        this.UserRepository = UserRepository;
        this.CommentRepository = CommentRepository;
    }
    async CheckUser(UserId, UserPassword) {
        try {
            return await this.UserRepository.count({
                where: { id: UserId, password: await (0, user_service_1.Hash)(UserPassword) }
            });
        }
        catch (err) {
            return 0;
        }
    }
    CreatePost(UserId, UserPassword, UserPost1) {
        return new Promise(async (res) => {
            this.UserRepository.findOne({
                attributes: ['CountOfPostPack'],
                where: { id: UserId, password: await (0, user_service_1.Hash)(UserPassword) }
            }).then((CountOfPostPack) => {
                const UserPost = Object.assign(Object.assign({}, UserPost1), { numberOfPack: CountOfPostPack.CountOfPostPack === 0 ? 1 : CountOfPostPack.CountOfPostPack });
                if (CountOfPostPack.CountOfPostPack === null) {
                    return res('{"status": 401}');
                }
                if (CountOfPostPack.CountOfPostPack === 0) {
                    const NewPostPack = {
                        author: UserId,
                        number: 1,
                        object: JSON.stringify({ Posts: [UserPost] })
                    };
                    this.UserRepository.update({ CountOfPostPack: 1 }, {
                        where: { id: UserId }
                    });
                    this.CommentRepository.create({
                        author: UserId,
                        numberOfPack: 1,
                        numberOfPost: 1,
                        object: '[]'
                    });
                    return res(this.PostRepository.create(NewPostPack));
                }
                this.PostRepository.findOne({
                    where: { author: UserId, number: CountOfPostPack.CountOfPostPack }
                }).then(Res => {
                    if (JSON.parse(Res.object).Posts.length === 100) {
                        const NewPostPack = {
                            author: UserId,
                            number: CountOfPostPack.CountOfPostPack + 1,
                            object: JSON.stringify({ Posts: [UserPost] })
                        };
                        this.CommentRepository.create({
                            author: UserId,
                            numberOfPack: CountOfPostPack.CountOfPostPack + 1,
                            numberOfPost: 1,
                            object: '[]'
                        });
                        this.UserRepository.update({ CountOfPostPack: CountOfPostPack.CountOfPostPack + 1 }, {
                            where: { id: UserId }
                        });
                        return res(this.PostRepository.create(NewPostPack));
                    }
                    else {
                        const NewPostPack = JSON.parse(Res.object).Posts;
                        NewPostPack.unshift(UserPost);
                        this.CommentRepository.create({
                            author: UserId,
                            numberOfPack: CountOfPostPack.CountOfPostPack,
                            numberOfPost: NewPostPack.length,
                            object: '[]'
                        });
                        return res(this.PostRepository.update({
                            object: JSON.stringify({ Posts: NewPostPack })
                        }, {
                            where: {
                                author: UserId,
                                number: CountOfPostPack.CountOfPostPack
                            }
                        }));
                    }
                }).catch(err => {
                    return res(`{"status": ${err}`);
                });
            }).catch((err) => {
                return res('{"status": 401}');
            });
        });
    }
    DeletePost(UserId, UserPassword, NumberOfPost, NumberOfPack) {
        return new Promise(async (res, rej) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.PostRepository.findOne({
                where: { author: UserId, number: NumberOfPack }
            }).then((Res) => {
                const Posts = JSON.parse(Res.object);
                Posts.Posts[NumberOfPost - 1] = "deleted";
                this.PostRepository.update({ author: Res.author, number: Res.number, object: JSON.stringify(Posts) }, {
                    where: { author: UserId, number: NumberOfPack }
                }).then(() => {
                    this.CommentRepository.destroy({
                        where: { author: UserId, numberOfPack: NumberOfPack, numberOfPost: NumberOfPost }
                    }).then(() => {
                        return res('{"status": 200}');
                    }).catch(err => { return res('{"status": 500}'); });
                }).catch(err => { return res('{"status": 500}'); });
            }).catch(err => { return res('{"status": 500}'); });
        }).catch(err => { return '{"status": 500}'; });
    }
    LikePost(UserId, UserPassword, NumberOfPost, NumberOfPack, Author) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) !== 0) {
                this.PostRepository.findOne({ where: { author: Author, number: NumberOfPack } }).then((Res) => {
                    const NewPostObject = JSON.parse(Res.object);
                    if (NewPostObject.Posts[NumberOfPost - 1].likedBy.indexOf(UserId) !== -1 || NewPostObject.Posts[NumberOfPost - 1].dislikedBy.indexOf(UserId) !== -1) {
                        return res('{"status": 400}');
                    }
                    NewPostObject.Posts[NumberOfPost - 1].likes += 1;
                    NewPostObject.Posts[NumberOfPost - 1].likedBy.unshift(UserId);
                    this.PostRepository.update({ object: JSON.stringify(NewPostObject) }, {
                        where: { author: Author, number: NumberOfPack }
                    }).then(() => { return res('{"status": 200}'); }).catch(() => { return res('{"status": 500}'); });
                }).catch(() => {
                    return res('{"status": 500}');
                });
            }
            else {
                return res('{"status": 401}');
            }
        });
    }
    UnLikePost(UserId, UserPassword, NumberOfPost, NumberOfPack, Author) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) !== 0) {
                this.PostRepository.findOne({
                    where: { author: Author, number: NumberOfPack }
                }).then((Res) => {
                    const NewPostObject = JSON.parse(Res.object);
                    if (NewPostObject.Posts[NumberOfPost].likedBy.indexOf(UserId) === -1 || NewPostObject.Posts[NumberOfPost].dislikedBy.indexOf(UserId) !== -1) {
                        return res('{"status": 400}');
                    }
                    NewPostObject.Posts[NumberOfPost].likes -= 1;
                    NewPostObject.Posts[NumberOfPost].likedBy.splice(NewPostObject.Posts[NumberOfPost].likedBy.indexOf(UserId), 1);
                    this.PostRepository.update({ object: JSON.stringify(NewPostObject) }, {
                        where: { author: Author, number: NumberOfPack }
                    }).then(() => { return res('{"status": 200}'); }).catch(() => { return res('{"status": 500}'); });
                }).catch(err => {
                    return res('{"status": 500}');
                });
            }
            else {
                return res('{"status": 401}');
            }
        });
    }
    DislikePost(UserId, UserPassword, NumberOfPost, NumberOfPack, Author) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) !== 0) {
                this.PostRepository.findOne({
                    where: { author: Author, number: NumberOfPack }
                }).then((Res) => {
                    const NewPostObject = JSON.parse(Res.object);
                    if (NewPostObject.Posts[NumberOfPost - 1].dislikedBy.indexOf(UserId) !== -1 || NewPostObject.Posts[NumberOfPost - 1].likedBy.indexOf(UserId) !== -1) {
                        return res('{"status": 400}');
                    }
                    NewPostObject.Posts[NumberOfPost - 1].dislikes += 1;
                    NewPostObject.Posts[NumberOfPost - 1].dislikedBy.unshift(UserId);
                    this.PostRepository.update({ object: JSON.stringify(NewPostObject) }, {
                        where: { author: Author, number: NumberOfPack }
                    }).then(() => { return res('{"status": 200}'); }).catch(() => { return res('{"status": 500}'); });
                }).catch(() => {
                    return res('{"status": 500}');
                });
            }
            else {
                return res('{"status": 401}');
            }
        });
    }
    UnDislikePost(UserId, UserPassword, NumberOfPost, NumberOfPack, Author) {
        return new Promise(async (res, reject) => {
            if ((await this.CheckUser(UserId, UserPassword)) !== 0) {
                this.PostRepository.findOne({
                    where: { author: Author, number: NumberOfPack }
                }).then((Res) => {
                    const NewPostObject = JSON.parse(Res.object);
                    if (NewPostObject.Posts[NumberOfPost - 1].dislikedBy.indexOf(UserId) === -1 || NewPostObject.Posts[NumberOfPost - 1].likedBy.indexOf(UserId) !== -1) {
                        return res('{"status": 400}');
                    }
                    NewPostObject.Posts[NumberOfPost - 1].dislikes -= 1;
                    NewPostObject.Posts[NumberOfPost - 1].dislikedBy.splice(NewPostObject.Posts[NumberOfPost - 1].dislikedBy.indexOf(UserId), 1);
                    this.PostRepository.update({ object: JSON.stringify(NewPostObject) }, {
                        where: { author: Author, number: NumberOfPack }
                    }).then(() => { return res('{"status": 200}'); }).catch(() => { return res('{"status": 500}'); });
                }).catch(() => {
                    return res('{"status": 500}');
                });
            }
            else {
                return res('{"status": 401}');
            }
        });
    }
    GetPostByUserId(id, number) {
        return new Promise((res) => {
            this.UserRepository.findOne({
                attributes: ['CountOfPostPack'],
                where: { id: id }
            })
                .then((Number) => {
                this.PostRepository.findOne({
                    attributes: ['object'],
                    where: { author: id, number: Number.CountOfPostPack - number + 1 },
                }).then((Posts) => {
                    try {
                        if (!Posts.object) {
                            return res('{"status": 400, "message": "Not object"}');
                        }
                    }
                    catch (e) {
                        return res('{"status": 400, "message": "Not object"}');
                    }
                    return res(JSON.stringify({ status: 200, Posts: Posts.object }));
                })
                    .catch(() => {
                    return res('{"status": 500}');
                });
            }).catch(() => {
                return res('{"status": 500}');
            });
        });
    }
    AddComment(UserId, UserPassword, Author, NumberOfPost, NumberOfPack, Comment) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: Author, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                const NewComment = JSON.parse(Comments.object);
                NewComment.unshift(Comment);
                this.CommentRepository.update({ object: JSON.stringify(NewComment) }, {
                    where: { author: Author, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
                }).then(() => { return res('{"status":200}'); }).catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    DeleteComment(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack, NumberOfComment) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                const NewComment = JSON.parse(Comments.object);
                if (NewComment[NumberOfComment].authorId === UserId) {
                    NewComment[NumberOfComment] = "deleted";
                }
                this.CommentRepository.update({ object: JSON.stringify(NewComment) }, {
                    where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack },
                }).then(() => { return res('{"status":200}'); }).catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    LikeComment(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack, NumberOfComment) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                const NewComment = JSON.parse(Comments.object), needleComment = NewComment[NumberOfComment];
                if (needleComment.likedBy.indexOf(UserId) === -1 && needleComment.dislikedBy.indexOf(UserId) === -1) {
                    needleComment.likes += 1;
                    needleComment.likedBy.unshift(UserId);
                }
                else {
                    return res('{"status": 400}');
                }
                NewComment[NumberOfComment] = needleComment;
                this.CommentRepository.update({ object: JSON.stringify(NewComment) }, {
                    where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
                }).then(() => { return res('{"status":200}'); }).catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    DislikeComment(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack, NumberOfComment) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                const NewComment = JSON.parse(Comments.object), needleComment = NewComment[NumberOfComment];
                if (needleComment.likedBy.indexOf(UserId) === -1 && needleComment.dislikedBy.indexOf(UserId) === -1) {
                    needleComment.dislikes += 1;
                    needleComment.dislikedBy.unshift(UserId);
                }
                else {
                    return res('{"status": 400}');
                }
                NewComment[NumberOfComment] = needleComment;
                this.CommentRepository.update({ object: JSON.stringify(NewComment) }, {
                    where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
                }).then(() => { return res('{"status":200}'); }).catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    UnLikeComment(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack, NumberOfComment) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                const NewComment = JSON.parse(Comments.object), needleComment = NewComment[NumberOfComment];
                if (needleComment.likedBy.indexOf(UserId) !== -1 && needleComment.dislikedBy.indexOf(UserId) === -1) {
                    needleComment.likes -= 1;
                    needleComment.likedBy.splice(needleComment.likedBy.indexOf(UserId), 1);
                }
                else {
                    return res('{"status": 400}');
                }
                NewComment[NumberOfComment] = needleComment;
                this.CommentRepository.update({ object: JSON.stringify(NewComment) }, {
                    where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
                }).then(() => { return res('{"status":200}'); }).catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    UnDislikeComment(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack, NumberOfComment) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                const NewComment = JSON.parse(Comments.object), needleComment = NewComment[NumberOfComment];
                if (needleComment.likedBy.indexOf(UserId) === -1 && needleComment.dislikedBy.indexOf(UserId) !== -1) {
                    needleComment.dislikes -= 1;
                    needleComment.dislikedBy.splice(needleComment.dislikedBy.indexOf(UserId), 1);
                }
                else {
                    return res('{"status": 400}');
                }
                NewComment[NumberOfComment] = needleComment;
                this.CommentRepository.update({ object: JSON.stringify(NewComment) }, {
                    where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
                }).then(() => { return res('{"status":200}'); }).catch(() => { return res('{"status": 500}'); });
            }).catch(() => { return res('{"status": 500}'); });
        }).catch(() => { return '{"status": 500}'; });
    }
    GetComments(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.CommentRepository.findOne({
                where: { author: AuthorOfPost, numberOfPost: NumberOfPost, numberOfPack: NumberOfPack }
            }).then((Comments) => {
                return res(Comments);
            }).catch(() => { return '{"status": 500}'; });
        }).catch(() => { return '{"status": 500}'; });
    }
    VoteInSurvey(UserId, UserPassword, AuthorOfPost, NumberOfPost, NumberOfPack, VotedFor) {
        return new Promise(async (res) => {
            if ((await this.CheckUser(UserId, UserPassword)) === 0) {
                return res('{"status": 401}');
            }
            this.PostRepository.findOne({
                where: { author: AuthorOfPost, number: NumberOfPack }
            }).then(Post => {
                const NewPosts = JSON.parse(Post.object), Survey = NewPosts.Posts[NumberOfPost].survey;
                if (Survey === "null" || Survey === "deleted") {
                    return res('{"status": 400}');
                }
                for (let i = 0; i < Survey.length; ++i) {
                    if (Survey[i].voices.votedBy.indexOf(UserId) !== -1) {
                        return res('{"status": 400}');
                    }
                }
                if (NewPosts.Posts[NumberOfPost].IsMultipleChoice) {
                    for (let i = 0; i < VotedFor.length && VotedFor[i] != null; ++i) {
                        if (VotedFor[i]) {
                            Survey[i].voices.votedBy.unshift(UserId);
                            Survey[i].voices.Number += 1;
                        }
                    }
                }
                else {
                    Survey[VotedFor[0]].voices.votedBy.unshift(UserId);
                    Survey[VotedFor[0]].voices.Number += 1;
                }
                this.PostRepository.update({ object: JSON.stringify({ Posts: NewPosts.Posts }) }, {
                    where: { author: AuthorOfPost, number: NumberOfPack }
                }).then(() => {
                    return res('{"status": 200}');
                }).catch((e) => { return res('{"status": ' + e + '}'); });
            }).catch((e) => { return res('{"status": ' + e + '}'); });
        }).catch((e) => { return '{"status": ' + e + '}'; });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(post_model_1.Post)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(post_model_1.Comments)),
    __metadata("design:paramtypes", [Object, Object, Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map