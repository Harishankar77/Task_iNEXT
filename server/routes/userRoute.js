import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
} from "../controller/userController.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/getalluser", getAllUsers);
userRoute.get("/getuser/:id", getUserById);
userRoute.put("/updateuser/:id", updateUser);
userRoute.delete("/deleteuser/:id", deleteUser);

export default userRoute;
