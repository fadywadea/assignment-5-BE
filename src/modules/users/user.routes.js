"use strict";

import express from 'express';
import { deleteUser, getAllUsers, searchUserAge, searchUsers, signIn, signUp, updateUser } from './user.controller.js';
import { hashPassword } from '../../middleware/hashPassword.js';
import { checkEmailExist } from '../../middleware/checkEmailExist.js';
import { authUpdateUser } from '../../middleware/authenticationUpdateUser.js';

const userRouter = express.Router();
const baseUrl = '/users';

// All users && Sing up
userRouter.route(baseUrl).get(getAllUsers).post(checkEmailExist, hashPassword, signUp);

// Sign in
userRouter.post(`${baseUrl}/signin`, signIn);

// Update user && Delete user
userRouter.route(`${baseUrl}/:id`).patch(authUpdateUser, updateUser).delete(deleteUser);

// Search for user where his name start with...
userRouter.get(`${baseUrl}/search-users`, searchUsers);

// Search for user where his age is between...
userRouter.get(`${baseUrl}/search-users-age`, searchUserAge);

export default userRouter;
