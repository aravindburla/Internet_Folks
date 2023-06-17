import express from "express";
const router = express.Router();

import { authorize, throwError } from "../../Engine/Helper";
// import { Validate } from "./communityValidation";

import * as memberController from './memberController'

router
    .route('/add')
    .post(authorize ,memberController.addMember)

router
    .route('/delete')
    .post(authorize ,memberController.addMember)



export default router