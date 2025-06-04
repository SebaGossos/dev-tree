import jwt, { JwtPayload } from "jsonwebtoken";
export const generateJWT = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });

  