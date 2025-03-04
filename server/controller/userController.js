import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

// user Registration
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      dob,
      email,
      phone,
      password,
      photo: photoFromBody,
    } = req.body;

    
    const photo = req.file ? req.file.path : photoFromBody || null;

    if (
      !firstName ||
      !lastName ||
      !dob ||
      !address ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }

    // Check if email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Phone number already exists" });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      dob,
      address,
      email,
      phone,
      photo,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error During Registration", error });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "all fields required",
        success: false,
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error During Login", error });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error During Get All Users", error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error During Get By Id", error });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
  
    const { firstName, lastName, dob, address, email, phone } = req.body;
    const photo = req.file ? req.file.path : null;

    const updateData = {
      firstName,
      lastName,
      dob,
      address,
      email,
      phone,
      ...(photo && { photo }), 
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error During Updation", error });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error During Deleting", error });
  }
};
