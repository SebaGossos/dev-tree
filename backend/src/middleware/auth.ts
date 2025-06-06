import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  //! HANDLE ERROR
  const bearer = req.headers.authorization;
  const token = bearer?.split(" ")[1];

  if (!bearer || !token) {
    const error = new Error("No Autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof result === "object" && result.id) {
      const user = await User.findById(result.id).select("-password");
      if (!user) {
        const error = new Error("El usuario no existe");
        res.status(404).json({ error: error.message });
        return;
      }
      //? RESPONSE
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Token no valido" });
  }
};
