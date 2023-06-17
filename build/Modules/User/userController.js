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
exports.getMe = exports.signin = exports.signup = void 0;
const snowflake_1 = require("@theinternetfolks/snowflake");
const bcrypt_1 = __importDefault(require("bcrypt"));
// const bcrypt = require('bcrypt')
const User_1 = __importDefault(require("../../Engine/Models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // var salt = bcrypt.genSaltSync(10);
        const salt = bcrypt_1.default.genSaltSync(10);
        console.log(salt);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const userData = {
            id: snowflake_1.Snowflake.generate(),
            name: name,
            email: email,
            password: hashedPassword
        };
        const user = yield User_1.default.create(userData);
        return res.json(user);
    }
    catch (err) {
        return res.json(err);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body.password;
        let clause = { where: {} };
        if (req.body.email)
            clause.where.email = req.body.email;
        const user = yield User_1.default.findOne(clause);
        console.log(user);
        if (user === null)
            throw "Invalid user please register";
        const isMatched = yield bcrypt_1.default.compare(req.body.password, user.password);
        // if (isMatched) {
        const token = yield jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, "secret", {
            expiresIn: "1d",
        });
        return res.json({
            access_token: token,
        });
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.signin = signin;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(req.userId, { attributes: ['id', 'name', 'email'] });
        return res.json(user);
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.getMe = getMe;
