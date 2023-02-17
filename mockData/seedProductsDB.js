const mongoose = require("mongoose");
require("dotenv").config();
const Products = require("../src/models/Products");
const { products } = require("./products");

const seedProductsDB = async () => {
  let connection;
  try {
    mongoose.set("strictQuery", false);
    connection = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

    console.log("Clearing database...");
    await Products.deleteMany();

    console.log("Adding data...");
    await Products.create(products);

    console.log("Database successfully populated with data...");
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.disconnect();
    process.exit(0);
  }
};

seedProductsDB();
