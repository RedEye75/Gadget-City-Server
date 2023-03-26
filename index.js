const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.GADGET_CITY_ADMIN}:${process.env.GADGET_CITY_PASSWORD}@cluster0.petbnp7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const SmartWatchCollection = client
      .db("Gadget_City")
      .collection("SmartWatchCollection");

    // product add api
    app.post("/watches", async (req, res) => {
      const watch = req.body;
      // console.log(watch);
      const result = await SmartWatchCollection.insertOne(watch);
      res.send(result);
    });

    // api for get product
    app.get("/watches", async (req, res) => {
      const query = {};
      const cursor = SmartWatchCollection.find(query);
      const watches = await cursor.toArray();
      res.send(watches);
    });

    //  api to get category wise products
    app.get("/brand/:category", async (req, res) => {
      const category = req.params.category;
      const query = await SmartWatchCollection.find({
        category: category,
      }).toArray();
      res.send(query);
      // console.log(query);
      // console.log("hiiiiittt");
    });

    app.get("/allWatches", async (req, res) => {
      const allWatches = req.params.allWatches;
      const query = await SmartWatchCollection.find({
        allWatches: allWatches,
      }).toArray();
      res.send(query);
    });

    const CategoryCollection = client
      .db("Gadget_City")
      .collection("CategoryCollection");

    //  api to get category
    app.get("/category", async (req, res) => {
      const query = {};
      const cursor = CategoryCollection.find(query);
      const category = await cursor.toArray();
      res.send(category);
    });

    // -------------------------***users collection***-------------------------
    const usersCollection = client
      .db("Gadget_City")
      .collection("usersCollection");

    // api for add user to database
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });

    // api for get users
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    // -------------------------***bookings collection***-------------------------
    const bookingCollection = client
      .db("Gadget_City")
      .collection("bookingCollection");

    //  api for post booking or order
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    // api to get booking from  database
    app.get("/bookings", async (req, res) => {
      const query = {};
      const bookings = await bookingCollection.find(query).toArray();
      res.send(bookings);
    });
  } finally {
  }
}

run().catch((e) => console.error("errorrrr  : " + e));

app.get("/", (req, res) => {
  res.send("hello from gadget city server");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
