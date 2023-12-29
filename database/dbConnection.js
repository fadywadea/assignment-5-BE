"use strict";

import mongoose from 'mongoose';

export function dbConnection() {
  mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log("Database Connected Successfully");
  }).catch((e) => {
    console.log("Database error:", e);
  });
}