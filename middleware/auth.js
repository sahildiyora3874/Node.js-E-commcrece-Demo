const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');
const { error } = require("console");
const { decode } = require("punycode");
const { NOW } = require("sequelize");

const verifyToken = async (req, res, next) => { 
  try {
    const token = req.cookies.authToken;

    if(!token){
      return res.redirect("/login")
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET || '456', { ignoreExpiration: false });
    console.log(decode)

    const existingUser = await User.findOne({ where: { id: decoded.userId } });

    if(!existingUser){
      return new error("User Not Found..!")
    }
    req.user = existingUser
    next()
  } catch (error) {
    console.error('Error verifying token:', error);

    if (req.accepts(["json", "html"]) === "json") {
      return res.status(401).json({ error: "Invalid Token" });
    }

    return res.redirect("/login");
  }
};

app.use(verifyToken)

module.exports = verifyToken;

