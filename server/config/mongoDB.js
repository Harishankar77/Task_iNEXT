import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URI}/task`)
    .then(() => {
      console.log(`Data-Base is Connected Successfully :)`);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDB;
