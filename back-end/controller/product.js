const express = require("express");
const router = express.Router();
const isAuthorize = require("../service/utility/authorization");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductByMerchant,
  getById
} = require("../service/product");

router.get("/", getAllProducts);
router.get("/search/:name", getProduct);
router.use(isAuthorize);
router.get("/:id", getById); // get by id
router.get("/merchant/:merchantId", getProductByMerchant);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
