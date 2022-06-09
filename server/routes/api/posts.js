const express = require("express");
const mongodb = require("mongodb");
const { system } = require("nodemon/lib/config");
const { db } = require("../../user/model/User");

const router = express.Router();

//get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//ADD
router.post("/", async (req, res) => {
  const post = await loadPostsCollection();
  await post.insertOne({
    text: req.body.text,
    createdAt: new Date(),
    childern: new Object(),
  });
  res.status(201).send();
});

//DELETE
router.delete("/:id", async (req, res) => {
  const post = await loadPostsCollection();
  await post.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:******@cluster0.aja8z.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("test").collection("posts");
}

async function loadOrderCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:******@cluster0.aja8z.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("test").collection("order");
}

//get post with id
router.get("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  const id2 = mongodb.ObjectId(req.params.id);
  //const id = req.params.id;
  res.send(await posts.find({ _id: id2 }).toArray());
});

//get orders
router.get("/orders", async (req, res) => {
  const posts = await loadOrderCollection();
  res.send(await posts.find({}).toArray());
});

//get orders with id of buyer
router.get("/orders/:id", async (req, res) => {
  const posts = await loadOrderCollection();
  const id2 = mongodb.ObjectId(req.params.id);
  //const id = req.params.id;
  res.send(await posts.find({ _id: id2 }).toArray());
});

module.exports = router;
