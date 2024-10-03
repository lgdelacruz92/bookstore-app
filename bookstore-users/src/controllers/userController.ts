import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Unable to create book", message: JSON.stringify(error) });
  }
};
