import { Router } from "express";
import mongodb from "mongodb";
import slugify from "slugify";

const usersRouter = Router();

// Routes
// ------------ Get All Users
usersRouter.get("/", (req, res) => {
  // get all users from mongo
  // res.send(users);
});

// ------------ Get User By ID
usersRouter.get("/:id", (req, res) => {
  // get singular user by id from mongo
  const user = "";

  if (!user) {
    res.sendStatus(400);
  }

  res.send(user);
});

// ------------ Create User
usersRouter.post("/", (req, res) => {
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
usersRouter.put("/:id", (req, res) => {
  try {
    // get user by id
    // update user
    // res with returned document
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ Delete User
usersRouter.delete("/:id", (req, res) => {
  // delete user by id

  res.sendStatus(200);
});

export default usersRouter;
