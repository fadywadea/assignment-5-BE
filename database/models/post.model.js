"use strict";

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true });

export const postModel = mongoose.model('note', postSchema);