import { Snowflake } from "@theinternetfolks/snowflake";
import { RequestHandler, Response } from "express";
import Community from "../../Engine/Models/Community";
// import { slugeGeneration } from "../../Engine/Helper";
import Role from "../../Engine/Models/Role";


export const createRole: RequestHandler = async (req:any, res) => {
    try{
        let role = {
            name: req.body.name,
            id:Snowflake.generate()
        }
        const roleCreated = await Role.create(role);
        return res.json(roleCreated)
    }
    catch(err){
        return res.json({message: err})
    }
}
export const getAllRoles: RequestHandler = async (req:any, res) => {
    try{
        const roles = await Role.findAll();
        return res.json(roles)
    }
    catch(err){
        return res.json({message: err})
    }
}