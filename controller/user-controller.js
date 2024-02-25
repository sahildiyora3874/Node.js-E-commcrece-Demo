const { User } = require("../models/user");
const { sequelize, pool } = require("../config/db");
const userservice = require("../servies/user.service");
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const { isColString } = require("sequelize/types/utils");

// Signup
const signupUserController = async (req, res) => {
  try {
    const userBody = req.body;
    console.log(userBody)
    console.log(req.body)
    const newUser = await userservice.signupUser(userBody);

    if (req.accepts(["json", "html"]) === "json") {
      return res
        .status(201)
        .json({ status: "User signup Successfully..!", data: newUser });
    }

    res.render("/curd", { user: newUser });
  } catch (error) {
    console.error("----------Error in signup..!----------:", error);

    if (req.accepts(["json", "html"]) === "json") {
      return res 
        .status(500)
        .json({ status: "Error in signup", error: error.message });
    }

    res.ridirect("/dashboard", { error: error.message });
  }
};

// Login
const loginUserController = async (req, res) => {
  try {
    if (req.cookies.authToken) {
      return res.redirect("/dashboard");
    }

    const userBody = req.body
    console.log("User Body:", userBody);

    const loginResult = await userservice.loginUser(userBody, req);
    console.log("loginuser",loginResult)

    if (loginResult.redirectTo) {
      return res.redirect(loginResult.redirectTo);
    }

    const { user, token } = loginResult;
    console.log("---->",loginResult)
    console.group("------>",user)
    console.log('----->',token)

    if (req.accepts(["json", "html"]) === "json") {
      return res
        .status(200)
        .json({ status: "User login successfully", userData: user, token });
    }

    res.cookie("authToken", token, { httpOnly: true });
    return res.redirect("/curd");
  } catch (error) {
    console.error("Error In Login:", error);

    if (req.accepts(["json", "html"]) === "json") {
      return res
        .status(500)
        .json({ status: "Error in login", error:error.message });
    }
    return res.render("login", { error: error.message });
  }
};

module.exports = { signupUserController, loginUserController };
 