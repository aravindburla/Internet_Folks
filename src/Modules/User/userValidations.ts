import { body, param } from "express-validator";
import User from "../../Engine/Models/User";

export const Validate: any = (reqType: string) => {
    switch(reqType) {
        case 'signup' : {
            return [
                body('name')
                .notEmpty()
                .withMessage('name should not be empty')
                .bail()
                .isLength({min: 6})
                .withMessage("name should be greater than 2"),
                
                body("email")
                    .optional()
                    .toLowerCase()
                    .isEmail()
                    .withMessage("Please enter the valid email address")
                    .bail()
                    .matches(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)
                    .withMessage("Please enter the valid email address")
                    .custom(async (value, { req }) => {
                        return User.findOne({ where: { email: value } }).then((user) => {
                            if (user) {
                                return Promise.reject("Email is already taken");
                            }
                        });
                    }),

                body('password')
                    .notEmpty()
                    .withMessage("please enter the password")
                    .bail()
                    .isLength({min: 6})
                    .withMessage("password greater than 6 should be")
                   
            ]
        }

        case  'signin' : {
            return [
                body('email')
                    .notEmpty()
                    .withMessage("email should not be empty")
                    .bail()
                    .isEmail()
                    .withMessage("Please enter the valid email address"),
                    

                body('password')
                    .notEmpty()
                    .withMessage('password should not be empty')
                    .bail()
                    .isLength({ min: 6 })
                    .withMessage("Password must be 6 or more characters")
            ]
        }
    }
}