import mongoose from "mongoose";

console.log(process.env.MONGO_URI)
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI )
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(`MongoDb connected en ${url}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
};