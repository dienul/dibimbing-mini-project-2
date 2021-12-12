const express = require("express");
const router = express.Router();
const isAuthorize = require("../service/utility/authorization");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../service/product");

router.use(isAuthorize);
router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
