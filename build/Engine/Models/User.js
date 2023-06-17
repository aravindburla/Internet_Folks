"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const databaseLoader_1 = require("../Loaders/databaseLoader");
class User extends sequelize_1.Model {
}
exports.User = User;
// class User extends Model {}
User.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        unique: {
            name: "email",
            msg: "Email address already in use!",
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isValidPassword(value) {
                if (value.length < 6) {
                    throw new Error("Password Should Be Atleast 6 Characters");
                }
            },
        },
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
    tableName: "users",
    sequelize: databaseLoader_1.sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});
exports.default = User;
