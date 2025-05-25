import { Request, Response } from "express"

import User from "../models/User"

// this is the handler for the create account route
export const createAccountHandler = async (req: Request, res: Response) => {

  const { email } = req.body;
  // check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    const {message: error} = new Error('User already exists')
    res.status(409).send({ error })
    return
  }
  
  
  const user = new User(req.body)
  await user.save()
  
  res.status(201).send('REgistro creado correctamente')
}