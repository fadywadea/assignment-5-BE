"use strict";

import { userModel } from "../../../database/models/user.model.js";
import bcrypt from 'bcrypt';

// All users
export const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ data: users });
};

// Sing up
export const signUp = async (req, res) => {
  await userModel.insertMany(req.body);
  res.status(201).json({ message: 'Signup Successful.' });
};

// Sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  user ?
    bcrypt.compareSync(password, user.password) ?
      res.status(200).json(`Welcome ${user.userName}.`) :
      res.status(401).json('Invalid Password.') :
    res.status(401).json('Invalid Email.');
};

// Update user
export const updateUser = async (req, res) => {
  res.status(200).json({ message: "Updated successfully." });
};

// Delete user
export const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete({ _id: req.params.id });
  deletedUser == null ?
    res.status(404).json("User Not founded.") :
    res.status(200).json({ message: "Deleted successfully." });
};

// Search for user where his name start with...
export const searchUsers = async (req, res) => {
  const { userName, age } = req.body;
  const users = await userModel.find({ userName: new RegExp(`^${userName}`), age: { $lt: age } });
  !users.length ?
    res.status(404).json("No user found.") :
    res.status(200).json({users});
};

// Search for user where his age is between...
export const searchUserAge = async (req, res) => {
  const { ageX, ageY } = req.body;
  const users = await userModel.find({ age: { $gt: ageX, $lt: ageY } });
  !users.length ?
    res.status(404).json("No user found.") :
    res.status(200).json({users});
};