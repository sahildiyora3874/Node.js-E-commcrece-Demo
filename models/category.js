const { DataTypes } = require("sequelize");
const User = require("../models/user");
const db = require("../config/db");

const Category = db.sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});


Category.sync({ force: true })
  .then(() => {
    console.log("Category model synced with the database");
  })
  .catch((error) => {
    console.error("Error syncing category model:", error);
  });

module.exports =  Category;
