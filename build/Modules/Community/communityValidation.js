"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const express_validator_1 = require("express-validator");
const Validate = (reqType) => {
    switch (reqType) {
        case 'create': {
            return [
                (0, express_validator_1.body)('name')
                    .notEmpty()
                    .withMessage('name should not be empty')
                    .bail()
                    .isLength({ min: 6 })
                    .withMessage("name should be greater than 2"),
                // body('slug')
                // .notEmpty()
                // .withMessage('name should not be empty')
                // .bail()
                // .isLength({min: 6})
                // .withMessage("name should be greater than 2"),
                // body('owner')
                //     .notEmpty()
                //     .withMessage("please enter the owner")
                //     .bail()
                //     .isInt()
                //     .withMessage("owner id should be integer")
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
