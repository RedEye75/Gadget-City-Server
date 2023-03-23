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

    const CategoryCollection = client
      .db("Gadget_City")
      .collection("CategoryCollection");

    app.get("/watches", async (req, res) => {
      const query = {};
      const cursor = SmartWatchCollection.find(query);
      const watches = await cursor.toArray();
      res.send(watches);
    });

    app.get("/category", async (req, res) => {
      const query = {};
      const cursor = CategoryCollection.find(query);
      const category = await cursor.toArray();
      res.send(category);
    });
  } finally {
  }

  // app.get("/products/:category", async (req, res) => {
  //   const category = req.params.category;
  //   const query = { category: category };
  //   const result = await SmartWatchCollection.find(query).toArray();
  //   res.send(result);
  // });
}

run().catch((e) => console.error("errorrrr  : " + e));

app.get("/", (req, res) => {
  res.send("hello from gadget city server");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
