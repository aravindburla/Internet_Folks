import { Snowflake } from "@theinternetfolks/snowflake";
import { RequestHandler, Response } from "express";
import Community from "../../Engine/Models/Community";
import { slugeGeneration } from "../../Engine/Helper";
import Role from "../../Engine/Models/Role";
import Member from "../../Engine/Models/Member";
import User from "../../Engine/Models/User";


export const createCommunity: RequestHandler = async (req:any, res) => {
    try{
        const {name, owner} = req.body;

        let slug = await slugeGeneration(name);
        console.log(slug)
        let communityData = {
            id: await Snowflake.generate(),
            name: name,
            slug: slug,
            owner: req.userId
        }
        console.log(communityData)
        const createdCommunity:any = await Community.create(communityData)

        let clause:any = { where : {}}

        clause.where.name = 'Community Admin'

        const role = await Role.findOne(clause);

        let memberData = {
            id: Snowflake.generate(),
            community: createdCommunity.id,
            user: req.userId,
            role: role.id
        }

        const memberCreate : any = await Member.create(memberData);

        // return res.json({createdCommunity});
        return res.json({createdCommunity,role,memberCreate});
    }
    catch(err){
        return res.json({message: err})
    }
}


export const getAllCommunities: RequestHandler = async (req:any, res) => {
    try{
        const communities = await Community.findAll({
            attributes:{exclude:['owner']},
            include:{
                model: User,
                attributes:['id','name'],
                required:false,
            }
        })
        return res.json(communities);
    }
    catch(err){
        return res.json({message: err})
    }
}

export const getAllCommunityMembers: RequestHandler = async (req:any, res) => {
    try{
        const communities = await Community.findByPk(req.params.id,{
            // attributes:{exclude:['owner']},
            include:{
                model: Member,
                required:false,
            }
        })
        return res.json(communities);
    }
    catch(err){
        return res.json({message: err})
    }
}

export const getOwnedCommunity: RequestHandler = async (req:any, res) => {
    try{
        let clause:any = { where : {}}
        clause.where.owner = req.userId
        const communities = await Community.findAll(clause)
        return res.json(communities);
    }
    catch(err){
        return res.json({message: err})
    }
}

export const getJoinedCommunity: RequestHandler = async (req:any, res) => {
    try{
        let clause:any = { where : {}, include : {
            model: Community,
            required: false
        }}
        clause.where.user = req.userId
        const communities = await Member.findAll(clause)
        return res.json(communities);
    }
    catch(err){
        return res.json({message: err})
    }
}