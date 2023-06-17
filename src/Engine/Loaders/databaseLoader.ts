import {Sequelize} from "sequelize"
// Sequlize connection setup
export const sequelize = new Sequelize(
    "task",
    "postgres",
    "root",
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        native: false,
        pool: {
            max: 25,
            acquire: 10000,
            idle: 29000,
            evict: 30000,
        },
        logging: true,

    }
);

export const databaseLoader = async () => {
    sequelize
        .sync()
        .then(async () => {
            console.log("Database Connected");
        })
        .catch((err:any) => {
            console.log("An Error Occured: ", String(err));
        });
};
