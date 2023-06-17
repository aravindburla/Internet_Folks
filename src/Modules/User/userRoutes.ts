import express from "express";
const router = express.Router();

import { authorize, throwError } from "../../Engine/Helper";
import { Validate } from "./userValidations";

import * as UserContoller from './userController'

router
    .route('/signup')
    .post(Validate('signup'), throwError, UserContoller.signup)

router
    .route('/login')
    .post(Validate('signin'), throwError , UserContoller.signin)

router
    .route('/me')
    .get(authorize , UserContoller.getMe)

export default router;