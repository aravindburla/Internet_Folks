import {QueryInterface, Sequelize, DataTypes } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.createTable("members", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        community: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
              model: "communities",
              key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        user: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
              model: "users",
              key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        role: {
          allowNull: true,
          type: DataTypes.BIGINT,
          references: {
              model: "roles",
              key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },

        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
        },

        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable('members');
  }
};
