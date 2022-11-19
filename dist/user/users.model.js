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
exports.user_filesOTHER = exports.user_filesMUSIC = exports.user_filesVIDEO = exports.user_filesIMAGE = exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(23), allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(23), allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "friends", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "subscribers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(63), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "favorite_books", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "favorite_films", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "favorite_games", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "favorite_meals", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(63), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "family_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "place_of_residence", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(63), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "attitude_to_smocking", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(63), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "attitude_to_sport", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(63), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "attitude_to_alcohol", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(123), allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "dreams", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: null, allowNull: false }),
    __metadata("design:type", Number)
], User.prototype, "CountOfPostPack", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users", createdAt: false, updatedAt: false })
], User);
exports.User = User;
let user_filesIMAGE = class user_filesIMAGE extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], user_filesIMAGE.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesIMAGE.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesIMAGE.prototype, "dir", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], user_filesIMAGE.prototype, "date", void 0);
user_filesIMAGE = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users_filesIMAGE", createdAt: false, updatedAt: false })
], user_filesIMAGE);
exports.user_filesIMAGE = user_filesIMAGE;
let user_filesVIDEO = class user_filesVIDEO extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], user_filesVIDEO.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesVIDEO.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesVIDEO.prototype, "dir", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], user_filesVIDEO.prototype, "date", void 0);
user_filesVIDEO = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users_filesVIDEO", createdAt: false, updatedAt: false })
], user_filesVIDEO);
exports.user_filesVIDEO = user_filesVIDEO;
let user_filesMUSIC = class user_filesMUSIC extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], user_filesMUSIC.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: false }),
    __metadata("design:type", String)
], user_filesMUSIC.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesMUSIC.prototype, "dir", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], user_filesMUSIC.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], user_filesMUSIC.prototype, "number_of_eavesdroppers", void 0);
user_filesMUSIC = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users_filesMUSIC", createdAt: false, updatedAt: false })
], user_filesMUSIC);
exports.user_filesMUSIC = user_filesMUSIC;
let user_filesOTHER = class user_filesOTHER extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true }),
    __metadata("design:type", Number)
], user_filesOTHER.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesOTHER.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], user_filesOTHER.prototype, "dir", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], user_filesOTHER.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false }),
    __metadata("design:type", Boolean)
], user_filesOTHER.prototype, "danger", void 0);
user_filesOTHER = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users_filesOTHER", createdAt: false, updatedAt: false })
], user_filesOTHER);
exports.user_filesOTHER = user_filesOTHER;
//# sourceMappingURL=users.model.js.map