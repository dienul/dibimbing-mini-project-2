const express = require("express");
const router = express.Router();
const isAuthorize = require("../service/utility/authorization");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} = require("../service/product");

router.get("/", getAllProducts);
router.use(isAuthorize);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
