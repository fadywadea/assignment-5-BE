"use strict";

import mongoose from 'mongoose';

export const mongooseConnection = mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
  console.log("Database connected");
}).catch((e) => {
  console.log("Database error:", e);
});