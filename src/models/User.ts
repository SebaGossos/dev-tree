import mongoose, { Schema } from "mongoose";

// this is the interface for the user model
export interface IUser {
  name: string;
  email: string;
  password: string;
}
// this is the user schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
})

const User = mongoose.model<IUser>("User", userSchema)
export default User