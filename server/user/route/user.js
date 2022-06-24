const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../config/auth");
const { collection } = require("../model/User");
const User = require("../model/User");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);

router.patch("/me/:id", async function (req, res, next) {
  let point = req.body.point;
  await User.updateOne(
    {
      text: req.params.text,
    },
    {
      $inc: {
        points: point,
      },
    }
  );
});
module.exports = router;
