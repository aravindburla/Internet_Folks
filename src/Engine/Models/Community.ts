import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../Loaders/databaseLoader";
import Member from "./Member";
import User from "./User";


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
class Community extends Model {}

Community.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        name: {
            type: DataTypes.STRING,
        },

        slug: {
            type: DataTypes.STRING,
        },

        // owner: {
        //     type: DataTypes.BIGINT,
        //     references: {
        //         model: "users",
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
        tableName: "communities",
        sequelize,
        underscored: true,
        timestamps:true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

Community.hasMany(Member,{
    foreignKey:{
        name:'community'
    }
})
Member.belongsTo(Community, {foreignKey:{
    name:'community'
}})

User.hasMany(Community,{
    foreignKey:{
        name:'owner'
    }
})
Community.belongsTo(User, {foreignKey:{
    name: 'owner'
}})

// Community.hasMany(Member)
// Member.belongsTo(Community, {foreignKey:{
//     name:'community'
// }})

// User.hasMany(Community)
// Community.belongsTo(User, {foreignKey:{
//     name: 'user'
// }})

export default Community;