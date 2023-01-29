import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  mongoose.set("strictQuery", false);
  return await mongoose.connect(process.env.MONGO_URI || "");
};

export default connectDb;
