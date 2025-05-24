import colors from "colors";

import mongoose from "mongoose";

console.log(process.env.MONGO_URI)
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect( process.env.MONGO_URI )
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(colors.cyan.bold(`MongoDb connected in ${url}`))
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message))
    process.exit(1)
  }
};