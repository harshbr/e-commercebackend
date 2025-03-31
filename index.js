require("dotenv").config();
const express = require("express");
const app = express();
const Port = 3000;
const mongoose = require("mongoose");
const usermodell = require("./model/usermodel");
const categorymodel = require("./model/categorymodel");
const ordermodell = require("./model/ordermodel");
const productmodell = require("./model/productmodel");
const emailvalidator = require("email-validator");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const categortmodel = require("./model/categorymodel");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(bodyParser.json());

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/registeruser", async (req, res) => {

  
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Every field is mandatory",
    });
  }

  const nemail = emailvalidator.validate(email);

  if (!nemail) {
    return res.status(400).json({
      message: "Enter a valid email",
    });
  }

  try {
    const passdecode = await bcrypt.hash(password, 10);
    const userenter = new usermodell({ name, email, password: passdecode });
    const saveuser = await userenter.save();
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "An error occurred during registration",
    });
  }
});

app.post("/loginuser", async (req, res) => {
  try {
    
    const { email, password } = req.body;

    const emailfind = await usermodell.findOne({ email });

    if (!emailfind) {
      res.status(400).json({
        message: "invalid credential",
      });
    }

    const passwordcompare = await bcrypt.compare(password, emailfind.password);
    if (!passwordcompare) {
      res.status(400).json({
        message: "invalid credential",
      });
    }
    const tokengenerate = jwt.sign({ userId: emailfind._id }, "your_key");
    res.status(200).json({
      message: "user login successfully",
      tokengenerate,
    });
  } catch (error) {
    res.status(400).json({
      error: "An error occurred during login",
    });
  }
});

app.post("/product/category", async (req, res) => {
  const { productname, productcategoryimg } = req.body;

  try {
    const productsave = new categorymodel({
      productname,
      productcategoryimg,
    });
    const saveproductcategory = await productsave.save();

    res.status(200).json({
      message: "product category added successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured during category add",
    });
  }
});

app.get("/product/categoryget", async (req, res) => {
  try {
    const getcategory = await categortmodel.find({});
    res.json(getcategory);
  } catch (error) {
    res.status(400).json({
      message: "error in featching category",
    });
  }
});

app.post("/product/productspost", async (req, res) => {
  const {
    category,
    productname,
    productimage,
    price,
    description,
    batterhours,
  } = req.body;

  try {
    const saveproduct = new productmodell({
      category,
      productname,
      productimage,
      price,
      description,
      batterhours,
    });
    const saveproductwithcategory = await saveproduct.save();
    res.status(200).json({
      message: "product added successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured during product add",
    });
  }
});

app.get("/product/getproduct/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const getproductdata = await productmodell.find({
      category: categoryId,
    });
    res.json(getproductdata);
  } catch (error) {
    res.status(400).json({
      message: "error occured during product featch",
    });
  }
});

app.get("/product/getsingleproduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const getproductdata = await productmodell.findOne({
      _id: productId,
    });
    res.json(getproductdata);
  } catch (error) {
    res.status(400).json({
      message: "error occured during product featch",
    });
  }
});

app.post("/orderpost", async (req, res) => {
  const { email, total, items, orderdate, ordertime } = req.body;
  try {
    const saveorderdata = new ordermodell({
      email,
      total,
      items,
      orderdate,
      ordertime,
    });
    const savetodnorder = await saveorderdata.save();
    res.status(200).json({
      messagee: "order has been submited successfully",
    });
  } catch (error) {
    res.status(400).json({
      messagee: "order occured during order submit",
    });
  }
});

app.get("/orderget", async (req, res) => {
  const emaivalid = req.query.email;
  try {
    const getdataoforder = await ordermodell.find({ email: emaivalid }).sort({
      date: -1,
    });

    res.json({ message: "Order found", data: getdataoforder });
  } catch (error) {
    console.error("Error in finding order:", error);
    res.status(500).json({ error: "An error occurred while finding orders" });
  }
});
app.listen(Port, () => {
  console.log(`SERVER IS RUNNING IN PORT NUMBER ${Port}`);
});
