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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Post = class Post extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Post.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Post.prototype, "number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false, unique: false }),
    __metadata("design:type", String)
], Post.prototype, "object", void 0);
Post = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "posts", createdAt: false, updatedAt: false })
], Post);
exports.Post = Post;
let Comments = class Comments extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false, unique: false }),
    __metadata("design:type", Number)
], Comments.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false, unique: false }),
    __metadata("design:type", Number)
], Comments.prototype, "numberOfPack", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false, unique: false }),
    __metadata("design:type", Number)
], Comments.prototype, "numberOfPost", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false, unique: false }),
    __metadata("design:type", String)
], Comments.prototype, "object", void 0);
Comments = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'comments', createdAt: false, updatedAt: false })
], Comments);
exports.Comments = Comments;
//# sourceMappingURL=post.model.js.map