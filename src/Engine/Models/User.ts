import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../Loaders/databaseLoader";


interface usersAttributes {
    id: bigint;
    name?: string;
    email?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

type usersCreationAttributes = Optional<usersAttributes, "id">

export class User extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
    public id!: bigint;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date;
}
// class User extends Model {}

User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        name: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            unique: {
                name: "email",
                msg: "Email address already in use!",
            },
        },


        password: {
            type: DataTypes.STRING,
            validate: {
                isValidPassword(value: any) {
                    if (value.length < 6) {
                        throw new Error("Password Should Be Atleast 6 Characters");
                    }
                },
            },
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
        tableName: "users",
        sequelize,
        timestamps:true,
        underscored: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);


export default User