import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Unable to create book", message: JSON.stringify(error) });
  }
};

export const findUserById = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOne({ uid: user_id });
    if (!user) {
      throw Error("User not found");
    }
    res.json(user);
  } catch (err) {
    res
      .status(404)
      .json({ error: "User not found", message: JSON.stringify(err) });
  }
};
