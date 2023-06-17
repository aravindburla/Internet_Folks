import express from "express";
const router = express.Router();

import { authorize, throwError } from "../../Engine/Helper";
// import { Validate } from "./communityValidation";

import * as roleController from './RoleController'

router
    .route('/create')
    .post(roleController.createRole)

router
    .route('/roles')
    .get(roleController.getAllRoles)


export default router