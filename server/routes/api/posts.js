const express = require("express");
const mongodb = require("mongodb");

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
    "mongodb+srv://LukaGrubesa:Kh7njvtu@cluster0.aja8z.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("test").collection("posts");
}

module.exports = router;
