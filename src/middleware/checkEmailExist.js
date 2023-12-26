"use strict";

import { userModel } from "../../database/models/user.model.js";

export const checkEmailExist = async (req, res, next) => {
  const {email} = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(400).json("Email already in use.");
  next();
}