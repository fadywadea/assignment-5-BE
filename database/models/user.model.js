"use strict";

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  phone: String,
  
}, { timestamps: true });

export const userModel = mongoose.model('user', userSchema);