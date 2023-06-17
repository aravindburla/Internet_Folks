"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseLoader_1 = require("../Loaders/databaseLoader");
const User_1 = __importDefault(require("./User"));
const Role_1 = __importDefault(require("./Role"));
// interface usersAttributes {
//     id?: string;
//     name?: string;
//     slug?: string;
//     owner?: string;
//     created_at?: Date;
//     updated_at?: Date;
//     deleted_at?: Date;
// }
// export type usersCreationAttributes = Optional<usersAttributes, "id">
// export class User extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
//     public id!: string;
//     public name!: string;
//     public email!: string;
//     public password!: string;
//     public readonly created_at!: Date;
//     public readonly updated_at!: Date;
//     public deleted_at!: Date;
// }
class Member extends sequelize_1.Model {
}
Member.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    community: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: "communities",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    user: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    role: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: "roles",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
    },
    deleted_at: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: "members",
    sequelize: databaseLoader_1.sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});
User_1.default.hasMany(Member);
Member.belongsTo(User_1.default, { foreignKey: 'user' });
Role_1.default.hasOne(Member);
Member.belongsTo(Role_1.default, { foreignKey: 'role' });
exports.default = Member;
