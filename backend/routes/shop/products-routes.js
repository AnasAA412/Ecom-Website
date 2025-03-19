const express = require("express");

const {
  getFilterProducts,
} = require("../../controllers/shop/products-controllers");

const router = express.Router();

router.get("/get", getFilterProducts);

module.exports = router;
