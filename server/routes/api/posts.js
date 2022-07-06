const express = require("express");
const mongodb = require("mongodb");
const { system } = require("nodemon/lib/config");
const Order = require("../../user/model/Order");
const Post = require("../../user/model/Post");
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
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("test").collection("posts");
}

async function loadOrderCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("test").collection("order");
}

//get post with id
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const posts = await loadPostsCollection();
  const id2 = req.params.id;
  //const id = req.params.id;
  res.send(await posts.find({ _id: id2 }).toArray());
});

router.get("/get/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  const id2 = req.params.id;
  //const id = req.params.id;
  res.send(await posts.find({ text: id2 }).toArray());
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
  res.send(await posts.find({ text: id2 }).toArray());
});
//puts 404, everything is sent
router.put("/post/:id", async (req, res) => {
  const id = mongodb.ObjectId(req.params.id);
  const id2 = req.body.url;

  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  client
    .db("test")
    .collection("posts")
    .updateOne(
      { _id: id },
      {
        $push: {
          childern: {
            text: id2,
            name: req.body.name,
          },
        },
      }
    );

  res.status(201).send();
});

router.put("/user/", async (req, res) => {
  const name = req.body.id;
  const point = req.body.point;
  console.log(name, point);

  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  client
    .db("test")
    .collection("users")
    .updateMany(
      { name: name },
      {
        $inc: { points: point },
      }
    );

  res.status(201).send();
});

router.put("/user/buy", async (req, res) => {
  const name = req.body.id;
  const point = req.body.point;
  console.log(name, point);

  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  client
    .db("test")
    .collection("users")
    .updateMany(
      { name: name },
      {
        $inc: { points: -point },
      }
    );

  const order = new Order({
    name: req.body.name,
    postCode: req.body.postCode,
    email: req.body.email,
    dateOfPurchace: new Date(),
    adress: req.body.adress,
  });
  let data = await order.save();

  res.status(201).send();
});

router.get("/findpoint/:id", async (req, res) => {
  const name2 = req.params.id;
  console.log(name2);
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  res.send(
    await client
      .db("test")
      .collection("users")
      .findOne(
        { name: name2 },
        {
          projection: {
            _id: 0,
            name: 0,
            email: 0,
            password: 0,
            isAdmin: 0,
            tokens: 0,
            __v: 0,
          },
        }
      )
  );
});

router.put("/abc", async (req, res) => {
  res.send("send");
});

router.get("/find/:id", async (req, res) => {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://LukaGrubesa:atlas123@cluster0.apyby.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  let cica = mongodb.ObjectID(req.params.id);

  res.send(
    await client.db("test").collection("posts").find({ _id: cica }).toArray()
  );
});
module.exports = router;
