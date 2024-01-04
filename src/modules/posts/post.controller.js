"use strict";

import { postModel } from "../../../database/models/post.model.js";
import { userModel } from "../../../database/models/user.model.js";

// All Posts
export const getAllNotes = async (req, res) => {
  const posts = await postModel.find();
  res.status(200).json({ data: posts });
}

// Add Post
export const addPosts = async (req, res) => {
  const findUser = await userModel.findById({ _id: req.params.id });
  const { title, content, createdBy } = req.body;
  if (!findUser) {
    res.status(401).json({ message: "Unauthorized." });
  } else {
    if (!title || !content || !createdBy) {
      res.status(400).json({ message: "Missing fields." });
    } else {
      if (findUser._id == createdBy) {
        await postModel.insertMany({ title, content, createdBy });
        res.status(200).json({ message: "Added post successfully." });
      } else {
        res.status(401).json({ message: "Unauthorized." });
      }
    }
  }
};

// Delete Post
export const DeletePosts = async (req, res) => {
  const findUser = await userModel.findById({ _id: req.params.id });
  const userId = req.params.id;
  const { _id } = req.body;
  if (!findUser) {
    res.status(401).json({ message: "Unauthorized." });
  } else {
    const postId = await postModel.findById({ _id });
    if (!postId) {
      res.status(404).json({ message: "Post not found." });
    } else {
      if (userId == postId.createdBy) {
        const result = await postModel.deleteOne({ _id });
        result.deletedCount > 0 ?
          res.status(200).json({ message: "Deleted post successfully." }) :
          res.status(404).json({ message: "Post not found." });
      } else {
        res.status(401).json({ message: "Unauthorized." });
      }
    }
  }
};

// Update Post
export const updatePosts = async (req, res) => {
  const userId = req.params.id;
  const findUser = await userModel.findById({ _id: userId });
  if (!findUser) {
    res.status(401).json({ message: "Unauthorized." });
  } else {
    const postId = await postModel.findById({ _id: req.body._id });
    if (!postId) {
      res.status(404).json({ message: "Post not found." });
    } else {
      if (userId == postId.createdBy) {
        const { title, content } = req.body;
        await postModel.findByIdAndUpdate({ _id: req.body._id }, { title, content }, { new: true });
        res.status(200).json({ message: "Updated post successfully." });
      } else {
        res.status(401).json({ message: "Unauthorized." });
      }
    }
  }
};

// Owners Posts
export const ownersPosts = async (req, res) => {
  const ownerPosts = await postModel.find().populate('createdBy', 'userName email age gender phone -_id');
  res.status(200).json({ data: ownerPosts });
};

// Sort Posts By Date
export const sortUsersDate = async (req, res) => {
  const posts = await postModel.find().sort([['createdAt', 'descending']]);
  res.status(200).json({ data: posts });
}