import mongoose, { Schema, Document } from "mongoose";

// this is the interface for the user model
export interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
}
// this is the user schema
const userSchema = new Schema({
  handle: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
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
  description: {
    type: String,
    default: ''
  },
})

const User = mongoose.model<IUser>("User", userSchema)
export default User