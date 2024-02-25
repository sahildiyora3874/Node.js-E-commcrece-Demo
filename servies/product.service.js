const { error } = require("console");
const Product = require("../models/product");

// create Product
const createProduct = async (productBody) => {
  const { name, categoryId, title, description, price, userId } = productBody;
  console.log("------------>",productBody)

  if (!name || !categoryId || !title || !description || !price || !userId) {
    throw new Error("Please Provide All Fields..!");
  }

  const existingProduct = await Product.findOne({ where: { userId } });

  if (existingProduct) {
    throw new Error("Product already exists for this user..!");
  }

  try {
    const newProduct = await Product.create({ ...productBody });  
    return newProduct
  } catch (error) {
    console.error(error)
    throw new error("somrthing went Wrong..!")
  }
};

//Get Product
const getProduct = async (productid) => {
    if (!productid) {
      throw new Error("Please Enter Category id ..!");
    }
  
    try {
      const newProduct = await Product.findByPk(productid);
  
    if(!newProduct){
      throw new error ("Product DOes Not Exist..!")
    }
      return newProduct
    } catch (error) {
      console.error(error);
      throw new Error("Error Retrieving Product: " + error.message);
    }
  };

  // Put Product
const putProduct = async (productid, updatedProductValue) => {
    if (!productid) {
      throw new Error("ProductId required..!");
    }
    
    const existingProduct = await Product.findByPk(productid);
  
    if (!existingProduct) {
      throw new Error("Product not found..!");0
    }
  
    try {
      existingProduct.set(updatedProductValue);
      await existingProduct.save();
  
      return existingProduct.toJSON();
    } catch (error) {
      console.error(error)
      throw new Error("Error updating Category:", error);
    }
  };
  
  // delete Product
  const deleteProduct = async (productid) => {
    if (!productid) {
      throw new Error("ProductId required..!");
    }
  
    const existingProduct = await Product.findByPk(productid);
  
    if (!existingProduct) {
      throw new Error("Product not found..!");
    }
  
    try {
      await existingProduct.destroy();
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting Product:", error);
    }
  };
  

module.exports = { createProduct , getProduct,putProduct, deleteProduct};
