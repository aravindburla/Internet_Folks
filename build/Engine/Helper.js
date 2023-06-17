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
exports.slugeGeneration = exports.authorize = exports.throwError = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("./Models/User"));
const throwError = (req, res, next) => {
    const errorsResult = express_validator_1.validationResult.withDefaults({
        formatter: (error) => {
            return {
                value: error.value,
                message: error.msg,
                param: error.param,
                location: error.location,
            };
        },
    });
    const errors = errorsResult(req);
    if (!errors.isEmpty()) {
        // return apiError("", res, errors.array(), 422);
        return res.json({ messge: errors.array() }).status(422);
    }
    next();
};
exports.throwError = throwError;
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const middleware : RequestHandler = async (req:any, res, next) => {
    try {
        const headerToken = req.header("Authorization");
        if (!headerToken) {
            throw { message: "Authentication Failed, Please ensure you have logged in.", code: 401 };
        }
        const token = headerToken.replace('Bearer ', '');
        const verifiedToken = jsonwebtoken_1.default.verify(token, "secret");
        const user = yield User_1.default.findOne({
            where: { id: verifiedToken.id },
        });
        // console.log(user)
        req.userId = verifiedToken.id;
        if (user === null) {
            // console.log('err')
            throw { message: "Authentication Failed, Please ensure you have logged in.", code: 401 };
        }
        // console.log('2')
        return next();
        // console.log('3')
    }
    catch (err) {
        return res.json({ message: err.message });
    }
    // }
    // return middleware;
});
exports.authorize = authorize;
const slugeGeneration = (title) => {
    // const titleToSlug = title => {
    let slug;
    // convert to lower case
    slug = title.toLowerCase();
    // remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string
    // replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");
    // remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    // remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
    // };
};
exports.slugeGeneration = slugeGeneration;
