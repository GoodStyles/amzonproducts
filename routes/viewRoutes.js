const express = require("express");

const viewControllers = require("../controllers/viewController");
const addProductsControllers = require("../controllers/addProductsController");

const router = express.Router();

router.get("/", viewControllers.home);
router.get("/categories", viewControllers.categories);
router
  .route("/categories/:products")
  .get(viewControllers.productsPage)
  
router.get("/addproducts", viewControllers.addProducts)
  
module.exports = router;
