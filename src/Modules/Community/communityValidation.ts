import { body, param } from "express-validator";
import User from "../../Engine/Models/User";

export const Validate: any = (reqType: string) => {
    switch(reqType) {
        case 'create' : {
            return [
                body('name')
                .notEmpty()
                .withMessage('name should not be empty')
                .bail()
                .isLength({min: 6})
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
                   
            ]
        }

        
    }
}