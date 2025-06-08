//* externals imports
import { Request, Response } from "express";
import slugify from "slugify";
import formidable from "formidable";

//* internals imports
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send({ error: new Error("Invalid email").message });
    return;
  }
  const checkUserPassword = await comparePassword(password, user?.password);
  if (!checkUserPassword) {
    res.status(401).send({ error: new Error("Invalid password").message });
    return;
  }
  //? If the user exists and the password is correct, create token and send a success response

  const token = generateJWT({ id: user.toObject()._id });
  res.send(token);
};

export const getUser = async (req: Request, res: Response) => void res.json(req.user);

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    const handle = slugify(req.body.handle, "");
    const handleExists = await User.findOne({ handle });

    //! HANDLE ERRORS
    if (handleExists && handleExists.email !== req.user.email) {
      const msgError = "Nombre de Usuario no disponible";
      const error = new Error(msgError).message;
      res.status(409).send({ error });
      return;
    }

    req.user.description = description;
    req.user.handle = handle;
    await req.user.save();
    res.send("Perfil Actualizado correctamente");
  } catch (e) {
    const error = new Error("Hubo un error");
    res.status(500).json({ error: error.message });
    return;
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });
  form.parse(req, (error, field, files) => {
    console.log(files.file[0].filepath)
  });

  try {
    
  } catch (e) {
    const error = new Error("Hubo un error");
    res.status(500).json({ error: error.message });
    return;
  }
};
