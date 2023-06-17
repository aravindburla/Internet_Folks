import { RequestHandler, Response } from "express";
import { Snowflake } from "@theinternetfolks/snowflake";
import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt')
import User from "../../Engine/Models/User";
import jwt from "jsonwebtoken";


export const signup: RequestHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // var salt = bcrypt.genSaltSync(10);
        const salt = bcrypt.genSaltSync(10);
        console.log(salt)
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userData: any = {
            id: Snowflake.generate(),
            name: name,
            email: email,
            password: hashedPassword
        }

        const user = await User.create(userData);

        return res.json(user);
    }
    catch (err: any) {
        return res.json(err)
    }
}

export const signin: RequestHandler = async (req, res) => {
    try {
        const { password } = req.body.password;
        let clause: any = { where: {} };

        if (req.body.email)
            clause.where.email = req.body.email


        const user = await User.findOne(clause);
        console.log(user)

        if (user === null)
            throw "Invalid user please register"

        const isMatched = await bcrypt.compare(req.body.password, user.password);
        // if (isMatched) {
        const token = await jwt.sign(
            { id: user.id, name: user.name },
            "secret",
            {
                expiresIn: "1d",
            }
        );

        return res.json({
            access_token: token,
        });

    }
    catch (err: any) {
        return res.json({ message: err })
    }
}

export const getMe: RequestHandler = async (req: any, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: ['id', 'name', 'email'] });
        return res.json(user)
    }
    catch (err: any) {
        return res.json({ message: err })
    }
}