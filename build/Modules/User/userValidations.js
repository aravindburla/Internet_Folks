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
exports.Validate = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../Engine/Models/User"));
const Validate = (reqType) => {
    switch (reqType) {
        case 'signup': {
            return [
                (0, express_validator_1.body)('name')
                    .notEmpty()
                    .withMessage('name should not be empty')
                    .bail()
                    .isLength({ min: 6 })
                    .withMessage("name should be greater than 2"),
                (0, express_validator_1.body)("email")
                    .optional()
                    .toLowerCase()
                    .isEmail()
                    .withMessage("Please enter the valid email address")
                    .bail()
                    .matches(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)
                    .withMessage("Please enter the valid email address")
                    .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
                    return User_1.default.findOne({ where: { email: value } }).then((user) => {
                        if (user) {
                            return Promise.reject("Email is already taken");
                        }
                    });
                })),
                (0, express_validator_1.body)('password')
                    .notEmpty()
                    .withMessage("please enter the password")
                    .bail()
                    .isLength({ min: 6 })
                    .withMessage("password greater than 6 should be")
            ];
        }
        case 'signin': {
            return [
                (0, express_validator_1.body)('email')
                    .notEmpty()
                    .withMessage("email should not be empty")
                    .bail()
                    .isEmail()
                    .withMessage("Please enter the valid email address"),
                (0, express_validator_1.body)('password')
                    .notEmpty()
                    .withMessage('password should not be empty')
                    .bail()
                    .isLength({ min: 6 })
                    .withMessage("Password must be 6 or more characters")
            ];
        }
    }
};
exports.Validate = Validate;
