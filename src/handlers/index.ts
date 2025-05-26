import { Request, Response } from "express";
import { validationResult } from "express-validator";
import slugify from "slugify";

import User from "../models/User";
import { hashPassword } from "../utils/auth";


// this is the handler for the create account route
export const createAccountHandler = async (req: Request, res: Response) => {
  
  //! ERROR HANDLING EXIST
  let errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()})
    return;
  }
  
  const { email, password } = req.body;
  const handle = slugify(req.body.handle, '');

  const userExists = await User.findOne({ email });
  const handleExists = await User.findOne({ handle });
  if (userExists || handleExists) {
    // handle the error
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
  res.status(201).send("REgistro creado correctamente");
};
