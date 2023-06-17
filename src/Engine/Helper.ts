// import { apiError } from "./../Helpers/helper";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "./Models/User";

export const throwError: RequestHandler = (req, res, next) => {
    const errorsResult = validationResult.withDefaults({
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
        return res.json({messge:errors.array()}).status(422)
    }

    next();
};


export const authorize: RequestHandler = async(req:any, res, next) => {
    // const middleware : RequestHandler = async (req:any, res, next) => {
        try{
            const headerToken:any = req.header("Authorization");

            if (!headerToken) { throw { message: "Authentication Failed, Please ensure you have logged in.", code: 401 }; }

            const token = headerToken.replace('Bearer ', '');

            const verifiedToken: any = jwt.verify(token, "secret");

            const user: any = await User.findOne({
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
        catch(err:any){
            return res.json({message : err.message})
        }
    // }
    // return middleware;
}

export const slugeGeneration = (title:any) => {
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
}