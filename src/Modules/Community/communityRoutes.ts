import express from "express";
const router = express.Router();

import { authorize, throwError } from "../../Engine/Helper";
import { Validate } from "./communityValidation";

import * as communityController from './communityController'

router
    .route('/create')
    .post(Validate('create'), throwError, authorize ,communityController.createCommunity)

router
    .route('/')
    .get(authorize ,communityController.getAllCommunities)

router
    .route('/own')
    .get(authorize ,communityController.getOwnedCommunity)

router
    .route('/joined')
    .get(authorize ,communityController.getJoinedCommunity)

router
    .route('/:id')
    .get(authorize ,communityController.getAllCommunityMembers)

export default router