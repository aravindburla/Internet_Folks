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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoles = exports.createRole = void 0;
const snowflake_1 = require("@theinternetfolks/snowflake");
// import { slugeGeneration } from "../../Engine/Helper";
const Role_1 = __importDefault(require("../../Engine/Models/Role"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let role = {
            name: req.body.name,
            id: snowflake_1.Snowflake.generate()
        };
        const roleCreated = yield Role_1.default.create(role);
        return res.json(roleCreated);
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.createRole = createRole;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.default.findAll();
        return res.json(roles);
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.getAllRoles = getAllRoles;
