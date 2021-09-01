import asyncHandler from "express-async-handler";
import generateToken from "../generateToken.js";
import User from "../models/userModel.js";

// desc   : Auth user & get token
// route  : POST /api/users/login
// access : Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// desc   : Register a new user
// route  : POST /api/users
// access : Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, dob, phoneNumber, email, password } = req.body;

  // find if phone number or email already exists
  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  const phoneNumberExists = await User.findOne({ phoneNumber });

  //If exists, throw the error
  if (usernameExists) {
    res.status(400);
    throw new Error("Username is taken");
  }

  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  if (phoneNumberExists) {
    res.status(400);
    throw new Error("Phone Number already exists");
  }

  // else store the phone number in a place to further verify it
  const user = await User.create({
    fullName,
    username,
    dob,
    phoneNumber,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc   : Get all users
// route  : GET /api/users
// access : Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export { authUser, registerUser, getUsers };
