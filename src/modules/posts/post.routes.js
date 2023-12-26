"use strict";

import express from 'express';
import { DeletePosts, addPosts, getAllNotes, ownersPosts, sortUsersDate, updatePosts } from './post.controller.js';

const postRouter = express.Router();
const baseUrl = '/posts';

// Add note
postRouter.get(baseUrl, getAllNotes);

// Add Posts
postRouter.post(`${baseUrl}/:id`, addPosts);

// Delete Posts
postRouter.delete(`${baseUrl}/:id`, DeletePosts);

// Update Post
postRouter.patch(`${baseUrl}/:id`, updatePosts);

//get all posts with their owners information (using populate)
postRouter.get(`${baseUrl}/owners-posts`, ownersPosts);

// Sort Posts By Date
postRouter.get(`${baseUrl}/sort-users`, sortUsersDate);

export default postRouter;












// 5- get all posts with their owners information(using populate)
// 6- sort posts descending (By date)