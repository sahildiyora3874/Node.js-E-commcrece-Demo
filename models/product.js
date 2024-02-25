const { DataTypes } = require("sequelize");
const User = require("../models/user");
const Category = require("../models/category");
const db = require("../config/db");

const Product = db.sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
});

Product.sync({ force: true })
  .then(() => {
    console.log("Product model sync with Database");
  })
  .catch((error) => {
    console.error("Error syncing Product model:", error);
  });

