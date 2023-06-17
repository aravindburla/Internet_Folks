"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const databaseLoader_1 = require("../Loaders/databaseLoader");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
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
    tableName: "roles",
    sequelize: databaseLoader_1.sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});
exports.default = Role;
