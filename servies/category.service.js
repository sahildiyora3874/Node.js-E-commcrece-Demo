const { where } = require("sequelize");
const Category = require("../models/category");

// create category
const createCategory = async (category, userId) => {
  if (!category || !userId) {
    throw new Error("ERROR: Category and User_id Both are required..!");
  }

  const existingCategory = await Category.findOne({
    where: { category, userId },
  });

  if (existingCategory) {
    throw new Error("Category already exists for this User..!");
  }

  try {
    const newCategory = await Category.create({ category, userId });

    return newCategory;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating Category: " + error.message);
  }
};

// Get category
const getCategory = async (categoryid) => {
  if (!categoryid) {
    throw new Error("Please Enter Category id ..!");
  }

  try {
    const newcategory = await Category.findByPk(categoryid);

    if (!newcategory) {
      throw new Error("Category Does Not Exist..!");
    }

    return newcategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error Retrieving Category: " + error.message);
  }
};

// Put category
const coustmizeCategory = async (categoryid, category) => {
  try {
    const existingCategory = await Category.findByPk(categoryid);

    if (!existingCategory) {
      throw new Error("Category Does Not Exist for ID: " + categoryid);
    }
    const updatecategory = await Category.update( {category:category}, {
      where: { id: categoryid },
    });

    return updatecategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error Updating Category: " + error.message);
  }
};


// delete Category
const deleteCategory = async (categoryid) => {
  if (!categoryid) {
    throw new Error("Please Enter Category id ..!");
  }

  try {
    const categoryToDelete = await Category.findByPk(categoryid);

    if (!categoryToDelete) {
      throw new Error("Category Does Not Exist..!");
    }
    await categoryToDelete.destroy();

    return "Category deleted successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Error Deleting Category: " + error.message);
  }
};

module.exports = {
  createCategory,
  getCategory,
  coustmizeCategory,
  deleteCategory,
};
