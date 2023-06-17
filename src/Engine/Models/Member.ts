import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../Loaders/databaseLoader";
import User from "./User";
import Role from "./Role";
import Community from "./Community";


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
class Member extends Model {}

Member.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        // community: {
        //     type: DataTypes.BIGINT,
        //     references: {
        //         model: "communities",
        //         key: "id",
        //     },
        //     onUpdate: "CASCADE",
        //     onDelete: "CASCADE",
        // },

        // user: {
        //     type: DataTypes.BIGINT,
        //     references: {
        //         model: "users",
        //         key: "id",
        //     },
        //     onUpdate: "CASCADE",
        //     onDelete: "CASCADE",
        // },

        // role: {
        //     type: DataTypes.BIGINT,
        //     references: {
        //         model: "roles",
        //         key: "id",
        //     },
        //     onUpdate: "CASCADE",
        //     onDelete: "CASCADE",
        // },
        
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
        tableName: "members",
        sequelize,
        timestamps:true,
        underscored: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

User.hasMany(Member,{foreignKey:{
    name:'user'
}})
Member.belongsTo(User,{foreignKey:{
    name: 'user'
}})


Role.hasOne(Member , {
    foreignKey:{
        name:'role'
    }
})
Member.belongsTo(Role, {foreignKey:{
    name:'role'
}})

export default Member;