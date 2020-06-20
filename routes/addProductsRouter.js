const express = require("express");
const addProductsControllers = require("../controllers/addProductsController");

const router = express.Router();

router.post("/:product", addProductsControllers.uploadProductImage, addProductsControllers.resizeImage, addProductsControllers.addProduct)

module.exports = router