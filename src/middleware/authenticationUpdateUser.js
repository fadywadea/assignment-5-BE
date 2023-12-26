"use strict";

import { userModel } from "../../database/models/user.model.js";
import bcrypt from 'bcrypt';

export const authUpdateUser = async (req, res, next) => {
  const { userName, age, gender, phone } = req.body;
  let hashPassword = bcrypt.hashSync(req.body.password, 8);
  let updatedUser = await userModel.findByIdAndUpdate(
    { _id: req.params.id },
    { userName: userName, password: hashPassword, age: age, gender: gender, phone: phone },
    { new: true }
  );
  updatedUser == null ?
    res.status(404).json("User Not founded.") :
    next();
}