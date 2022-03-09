import { Router } from "express";
import mongodb from "mongodb";
import slugify from "slugify";

const UserRouter = Router();

// Routes
// ------------ Get All Users
UserRouter.get("/", (req, res) => {
  // get all users from mongo
  // res.send(users);
});

// ------------ Get User By ID
UserRouter.get("/:id", (req, res) => {
  // get singular user by id from mongo
  const user = "";

  if (!user) {
    res.sendStatus(400);
  }

  res.send(user);
});

// ------------ Create User
UserRouter.post("/", (req, res) => {
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
UserRouter.put("/:id", (req, res) => {
  try {
    // get user by id
    // update user
    // res with returned document
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ Delete User
UserRouter.delete("/:id", (req, res) => {
  // delete user by id

  res.sendStatus(200);
});

export default UserRouter;
