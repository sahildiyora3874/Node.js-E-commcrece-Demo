const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const isAuthenticated = require("../middleware/auth");

//Signup
const signupUser = async (userBody) => {
  const { firstname, lastname, email, username, password } = userBody;
  console.log(userBody);

  if (!firstname || !lastname || !email || !username || !password) {
    throw new Error("Please provide all required fields.");
  }

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    throw new Error("Email is already in Use..!");
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error("Username Already in Use..!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user:", error);
  }
};


//Login
const loginUser = async (userBody, req) => {
  const { username, password } = userBody;
  console.log(userBody);

  if (!username || !password) {
    throw new Error("Please provide both username and password.");
  }

  if (isAuthenticated()) {
    return { redirectTo: "/dashboard" };
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (!existingUser) {
      throw new Error("User not found..! Please check your username.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new Error("Invalid password..! Please try again..!");
    }

    const token = jwt.sign({ userId: existingUser.id }, "123");
    return { token, user: existingUser };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Error logging in: " + error.message);
  }
};

module.exports = { signupUser, loginUser };
  