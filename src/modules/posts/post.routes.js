"use strict";

import express from 'express';
import { DeletePosts, addPosts, getAllNotes, ownersPosts, sortUsersDate, updatePosts } from './post.controller.js';
import { auth } from '../../middleware/auth.js';

const postRouter = express.Router();
const baseUrl = '/posts';
postRouter.use(auth);

// Add note
postRouter.get(baseUrl, getAllNotes);

// Add Posts && Delete Posts && Update Post
postRouter.route(`${baseUrl}/:id`).post(addPosts).delete(DeletePosts).patch(updatePosts);

//get all posts with their owners information
postRouter.get(`${baseUrl}/owners-posts`, ownersPosts);

// Sort Posts By Date
postRouter.get(`${baseUrl}/sort-posts`, sortUsersDate);

export default postRouter;
