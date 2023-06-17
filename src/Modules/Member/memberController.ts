import { Snowflake } from "@theinternetfolks/snowflake";
import { RequestHandler, Response } from "express";
import Community from "../../Engine/Models/Community";
// import { slugeGeneration } from "../../Engine/Helper";
import Role from "../../Engine/Models/Role";
import Member from "../../Engine/Models/Member";


export const addMember: RequestHandler = async (req:any, res) => {
    try{


        const role:any = await Role.findOne({
            where:{
                name: 'Community Member'
            }
        })
        // console.log(role)
        let memberData = {
            id: Snowflake.generate(),
            community: req.body.community,
            user: req.body.userId,
            role: role.id
        }
        console.log(memberData)
        const addMember = await Member.create(memberData);
        return res.json(addMember);
    }
    catch(err){
        return res.json({message: err})
    }
}

export const deleteMember: RequestHandler = async (req:any, res) => {
    try{
        

        const role:any = await Role.findOne({
            where:{
                name: 'Community Member'
            }
        })
        // console.log(role)
        let memberData = {
            // id: Snowflake.generate(),
            community: req.body.community,
            user: req.body.userId,
            role: role.id
        }
        console.log(memberData)
        const deletedMember = await Member.destroy({where:{
            id:req.body.community,
            user:req.body.userId,
        }})
        // const addMember = await Member.create(memberData);
        return res.json(deleteMember);
    }
    catch(err){
        return res.json({message: err})
    }
}