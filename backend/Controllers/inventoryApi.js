const asyncHandler = require("express-async-handler");

const fs = require("fs");
const path = require("path");
const Inventory = require("../Model/inventoryModel");

//GET
const getAllInventory = asyncHandler(async (req, res) => {
  console.log("reach here->>");
  try {
    const groceries = await Inventory.find();
    res.json(groceries);
  } catch (error) {
    console.error("Error fetching groceries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//pOSt
const addGrocery = asyncHandler(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const grocery = new Inventory({ name, quantity });
    await grocery.save();
    res.status(201).json(grocery);
  } catch (error) {
    console.error("Error adding grocery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update
const updateGrocery = asyncHandler(async (req, res) => {
  const { name, quantity } = req.body;
  console.log("new");
  console.log("id-->", req.params.id);

  try {
    const grocery = await Inventory.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ error: "Grocery item not found" });
    }
    if (grocery) {
      grocery.name = name;
      grocery.quantity = quantity;
      const updatedGrocery = await grocery.save();
      res.status(200).json(updatedGrocery);
    }

    // res.json(grocery);
  } catch (error) {
    console.error("Error updating grocery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//delete
const deleteGrocery = asyncHandler(async (req, res) => {
  console.log("id-->", req.params.id);
  try {
    const deletedGrocery = await Inventory.deleteOne({ _id: req.params.id });
    console.log("idsss-->", deletedGrocery);

    if (deletedGrocery.deletedCount === 0) {
      return res.status(404).json({ error: "Grocery item not found" });
    }

    res.status(200).json({ message: "Grocery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting grocery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { getAllInventory, addGrocery, updateGrocery, deleteGrocery };
// export { getAllInventory, addGrocery };
