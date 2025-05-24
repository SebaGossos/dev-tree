import mongoose, { Schema } from "mongoose";

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

const User = mongoose.model("User", userSchema)
export default User