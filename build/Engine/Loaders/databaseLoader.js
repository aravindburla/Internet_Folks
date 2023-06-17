"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseLoader = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Sequlize connection setup
exports.sequelize = new sequelize_1.Sequelize("task", "postgres", "root", {
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
    logging: false,
});
const databaseLoader = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.sequelize
        .sync({ force: true })
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Database Connected");
    }))
        .catch((err) => {
        console.log("An Error Occured: ", String(err));
    });
});
exports.databaseLoader = databaseLoader;
