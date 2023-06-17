import {QueryInterface, Sequelize, DataTypes } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.createTable("roles", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
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
    return queryInterface.dropTable('roles');
  }
};
