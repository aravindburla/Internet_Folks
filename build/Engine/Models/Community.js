"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseLoader_1 = require("../Loaders/databaseLoader");
const Member_1 = __importDefault(require("./Member"));
const User_1 = __importDefault(require("./User"));
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
class Community extends sequelize_1.Model {
}
Community.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
    },
    owner: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: "users",
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
    tableName: "communities",
    sequelize: databaseLoader_1.sequelize,
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});
Community.hasMany(Member_1.default);
Member_1.default.belongsTo(Community, { foreignKey: "community" });
User_1.default.hasMany(Community);
Community.belongsTo(User_1.default, { foreignKey: 'owner' });
exports.default = Community;
