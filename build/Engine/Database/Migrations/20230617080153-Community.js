"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable("communities", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: sequelize_1.DataTypes.BIGINT,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING
            },
            slug: {
                allowNull: true,
                type: sequelize_1.DataTypes.STRING
            },
            owner: {
                allowNull: true,
                type: sequelize_1.DataTypes.BIGINT,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            created_at: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: sequelize_1.DataTypes.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('communities');
    }
};
