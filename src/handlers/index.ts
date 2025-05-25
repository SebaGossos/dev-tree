import { Request, Response } from "express";

import User from "../models/User";
import { hashPassword } from "../utils/auth";

// this is the handler for the create account route
export const createAccountHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  // check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    const { message: error } = new Error("User already exists");
    res.status(409).send({ error });
    return;
  }

  const user = new User(req.body);
  // hash the password
  const hashedPassword = await hashPassword(user.password);
  console.log(hashedPassword);
  user.password = hashedPassword;
  // save the user to the database
  try {
    await user.save();
  } catch (error) {
    // handle the error
    res.status(500).send({ error });
    return;
  }
  // send a response to the client
  res.status(201).send("REgistro creado correctamente");
};
