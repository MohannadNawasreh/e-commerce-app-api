const router = require("express").Router();
const Product = require("../Models/Product.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../Routes/verifyToken");
/*
   get = response
   post = request
   put = update
   delete = delete
   patch = update
   options = request
   head = request
   connect = request
   trace = request
   all = request 
*/
//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
   const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
   let Products

    if (queryNew) {
      Products = await Product.find().sort({ createdAt: -1 }).limit(1);
    }
    else if (queryCategory) {
      Products = await Product.find({
        category: {
          $in: [queryCategory],
        },
      });
    }
    else {
      Products = await Product.find();
    };
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
