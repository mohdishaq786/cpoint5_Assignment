const express = require("express");
const {
  getAllInventory,
  addGrocery,
  updateGrocery,
  deleteGrocery,
} = require("../Controllers/inventoryApi");
const router = express.Router();

router.route("/").get(getAllInventory);

router.route("/addGrocery").post(addGrocery);
router.route("/:id").put(updateGrocery).delete(deleteGrocery);

module.exports = router;
