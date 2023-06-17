import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../Loaders/databaseLoader";


interface rolesAttributes {
    id?: string;
    name?: string;
    
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export type rolesCreationAttributes = Optional<rolesAttributes, "id">

export class Role extends Model<rolesAttributes, rolesCreationAttributes> implements rolesAttributes {
    public id!: string;
    public name!: string;
   
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date;
}

Role.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        name: {
            type: DataTypes.STRING,
        },
        
        created_at: {
            type: DataTypes.DATE,
        },

        updated_at: {
            type: DataTypes.DATE,
        },

        deleted_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "roles",
        sequelize,
        timestamps:true,
        underscored: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);


export default Role