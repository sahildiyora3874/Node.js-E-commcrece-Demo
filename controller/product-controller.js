const { Product } = require("../models/product");
const productservice = require("../servies/product.service");

// Create Product
const createProductController = async (req, res) => {
  try {
    const newProduct = await productservice.createProduct(req.body);
    console.log(newProduct)
    if (newProduct) {
      res.json({
        status: 200,
        message: "Product inserted successfully..!",
        data: newProduct,
      });
    }
    res.render("/createproduct",{product:newProduct})
  } catch (error) {
    console.error(error)
    res.status(400).json({
      Error: "Something went wrong while inserting Product..!",
    });
    res.render("/createproduct",{error: error.message})
  }
};

// Get Product
const getProductController = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
  
      const Result = await productservice.getProduct(id);
      if (Result) {
        res.json({
          status: 200,
          message: "Product Retrived SucessFully..!",
          data: Result,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        Error: "Something went wrong while Retriving Product..!",
      });
    }
  };

// Put Product
const putProductController = async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProductValue = req.body;
  
      const updatedProduct = await productservice.putProduct( productId,updatedProductValue);
  
      if (updatedProduct) {
        res.json({
          status: 200,
          message: "Product updated successfully..!",
          data: updatedProduct,
        });
      } else {
        res.status(404).json({
          Error: "Product not found..!",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        Error: "Something went wrong while updating Product..!",
      });
    }
  };

  // Delete Product
const deleteProductController = async (req, res) => {
    try {
      const id = req.params.id;

      const Result = await productservice.deleteProduct(id);
      if (Result) {
        res.json({
          status: 200,
          message: "Product Deleted SucessFully..!",
          data: Result,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        Error: "Something went wrong while Deleting Product..!",
      });
    }
  };


module.exports = { createProductController , getProductController ,putProductController ,deleteProductController};
