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
exports.createCommunity = void 0;
const snowflake_1 = require("@theinternetfolks/snowflake");
const Community_1 = __importDefault(require("../../Engine/Models/Community"));
const Helper_1 = require("../../Engine/Helper");
const createCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, owner } = req.body;
        let slug = yield (0, Helper_1.slugeGeneration)(name);
        console.log(slug);
        let communityData = {
            id: yield snowflake_1.Snowflake.generate(),
            name: name,
            slug: slug,
            owner: req.userId
        };
        console.log(communityData);
        const createdCommunity = yield Community_1.default.create(communityData);
        // let clause:any = { where : {}}
        // clause.where.name = 'Community Admin'
        // const role = await Role.findOne(clause);
        // let memberData = {
        //     id: Snowflake.generate(),
        //     community: createdCommunity.id,
        //     user: req.userId,
        //     role: role.id
        // }
        // const memberCreate : any = Member.create(memberData);
        return res.json({ createdCommunity });
        // return res.json({createdCommunity,role,memberCreate});
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.createCommunity = createCommunity;
