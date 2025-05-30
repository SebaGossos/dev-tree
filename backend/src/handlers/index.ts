import { Request, Response } from "express";
import slugify from "slugify";

import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";

// this is the handler for the create account route
export const createAccountHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const handle = slugify(req.body.handle, "");

  //! HANDLE ERRORS
  const userExists = await User.findOne({ email });
  const handleExists = await User.findOne({ handle });
  if (userExists || handleExists) {
    const msgError = userExists ? "User email already exists" : "Handle already exists";
    const error = new Error(msgError).message;
    res.status(409).send({ error });
    return;
  }

  const user = new User(req.body);

  // hash the password
  const hashedPassword = await hashPassword(password);
  user.password = hashedPassword;

  // create a slug for the user
  console.log(handle);
  user.handle = handle;

  // save the user to the database
  try {
    await user.save();
  } catch (error) {
    //! ERROR HANDLING MONGODB
    res.status(500).send({ error });
    return;
  }
  // send a response to the client
  res.status(201).send("Registro creado correctamente");
};

// this is the handler for the login route
export const logingHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //! HANDLE ERRORS
  const checkUserEmail = await User.findOne({ email });
  if (!checkUserEmail) {
    res.status(404).send({ error: new Error("Invalid email").message });
    return;
  }
  const checkUserPassword = await comparePassword(password, checkUserEmail?.password);
  if (!checkUserPassword) {
    res.status(401).send({ error: new Error("Invalid password").message });
    return;
  }

  //? If the user exists and the password is correct, send a success response
  res.send("Login successful");
};
