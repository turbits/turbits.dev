const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const mongodb = require("mongodb");

const slugopt = {
  replacement: "-",
  remove: /[$*_+~.()'"!\-:@]/g,
  lower: true,
  strict: true,
  locale: "en",
  trim: true,
};

// Routes
// ------------ Get All Users
router.get("/", (req, res) => {
  // get all users from mongo
  // res.send(users);
});

// ------------ Get User By ID
router.get("/:id", (req, res) => {
  // get singular user by id from mongo
  const user = "";

  if (!user) {
    res.sendStatus(400);
  }

  res.send(user);
});

// ------------ Create User
router.post("/", (req, res) => {
  try {
    const user = {
      ...req.body,
    };

    // insert user to mongo db

    res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ Update User
router.put("/:id", (req, res) => {
  try {
    // get user by id
    // update user
    // res with returned document
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ Delete User
router.delete("/:id", (req, res) => {
  // delete user by id

  res.sendStatus(200);
});

module.exports = router;
