const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Category = require("./category");

const User = db.sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: "id",
    },
  },
});

User.belongsTo(Category, { foreignKey: "categoryId" });

User.sync({ force: true })
  .then(() => {
    console.log("User model synced with the database");
  })
  .catch((error) => {
    console.error("Error syncing User model:", error);
  });

module.exports = User;
