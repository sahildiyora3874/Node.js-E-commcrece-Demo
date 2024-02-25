const categoryservice = require("../servies/category.service");
const userservice = require("../servies/user.service");
const { Category } = require("../models/category");
const express = require("express");

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { category, userId } = req.body;
    console.log(req.body);

    const newCategory = await categoryservice.createCategory(category, userId);
    if (req.accepts(["json", "html"]) === "json") {
      return res.status(201).json({
        status: "Category Created Successfully..!",
        data: newCategory,
      });
    }
    // console.log(newCategory)
    res.render("category", { category: newCategory });
  } catch (error) {
    console.error(error);
    if (req.accepts(["json", "html"]) === "json") {
      return res.status(500).json({
        status: "------Error in Create Category:",
        error: error.message,
      });
    }
    res.render("category", { error: error.message });
  }
};

// Get Category
const getCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const Result = await categoryservice.getCategory(id);
    if (req.accepts(["json", "html"]) === "json") {
      return res
        .status(201)
        .json({ status: "Category get Successfully..!", data: Result });
    }
    // res.render("category", { category: Result });
  } catch (error) {
    console.error(error);
    if (req.accepts(["json", "html"]) === "json") {
      return res.status(500).json({
        status: "------Error in Get Category-----:",
        error: error.message,
      });
    }
    // res.render("category", { error: error.message });
  }
};

// Put category
const coustmizeCategoryController = async (req, res) => {
  try {
    const { categoryid, category } = req.body;
    console.log(category,"===============>");

    const updatedResult = await categoryservice.coustmizeCategory(
      categoryid,
      category
    );
    console.log("--------------->", updatedResult);

    if (req.accepts(["json", "html"]) === "json") {
      return res
        .status(200)
        .json({
          status: "Category updated successfully..!",
          data: updatedResult,
        });
    }

    res.render("updatecategory", { category: updatedResult });
  } catch (error) {
    console.log(error);
    if (req.accepts(["json", "html"]) === "json") {
      return res.status(500).json({
        status: "Error in updating category",
        error: error.message,
      });
    }
    res.render("updatecategory", { error: error.message });
  }
};

// Delete Category
const deleteCategoryController = async (req, res) => {
  try {
    const {categoryid} = req.body

    const Result = await categoryservice.deleteCategory(categoryid);
    if (Result) {
      res.json({
        status: 200,
        message: "Category Deleted SucessFully..!",
        data: Result,
      });
    }
    res.render("deletecategory", { category: Result });
  } catch (error) {
    console.error(error);
    if (req.accepts(["json", "html"]) === "json") {
      return res.status(500).json({
        status: "------Error in Delete Category:",
        error: error.message,
      });
    }
    res.render("deletecategory", { error: error.message });
  }
};

module.exports = {
  createCategoryController,
  getCategoryController,
  coustmizeCategoryController,
  deleteCategoryController,
};
