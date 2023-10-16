// product.route.js

import { Router } from "express";
import ProductManagerFS from "../DAO/managers/productManagerFs.js";
import ProductManagerDb from "../DAO/managers/productManagerDb.js";

const route = Router();

// Import managers
const pmFs = new ProductManagerFS();
const pmDb = new ProductManagerDb();






// Get all products // query params
route.get("/api/products/", async (req, res) => {


  //queryParams
  const limit = parseInt(req.query.limit) ;
  const page= req.query.page
  try {
    const  fsProducts= await pmFs.getAll(limit);
    const dbProducts = await pmDb.getAll(limit);
    //res.json({ result: "success", payload: { fsProducts, dbProducts } });
    res.render("home", {fsProducts})
  } catch (error) {
    res.status(500).json({ result: "error", message: error.message });
  }
});

// Get by id
route.get("/api/products/:pid", async (req, res) => {
  try {
    const pid=req.params;
    
    const fsProduct = await pmFs.getById(pid.pid);
    const dbProduct = await pmDb.getById(pid.pid);
    //res.json({ result: "success", payload: {  dbProduct, fsProduct } });
    console.log(fsProduct)
    res.render("detail", {fsProduct})
  } catch (error) {
    res.status(500).json({ result: "error", message: error.message });
  }
});

// Create product
route.post("/api/products/", async (req, res) => {
  try {
    const product = req.body;
    
    
    const createdProduct = await pmDb.createProduct(product);
    await pmFs.writeProduct(createdProduct)
    res.json({ result: "success", payload: createdProduct });
  } catch (error) {
    res.status(500).json({ result: "error", message: error.message });
  }
});

// Update product
route.put("/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProductData = req.body;
    const updatedProduct = await pmDb.updateProduct(pid, updatedProductData);
    await pmFs.updateProduct(pid,updatedProduct)
    res.json({ result: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ result: "error", message: error.message });
  }
});

// Delete product
route.delete("/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await pmDb.deleteProduct(pid);
    await pmFs.deleteProduct(pid)
    res.json({ result: "success", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ result: "error", message: error.message });
  }
});

export default route;
