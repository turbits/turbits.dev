import { Router } from "express";
import getAll from "../controllers/PostController.mjs";
import mg from "mongoose";
import slugify from "slugify";

const postsRouter = Router();

// OPTIONS
const slugopt = {
  replacement: "-",
  remove: /[$*_+~.()'"!\-:@]/g,
  lower: true,
  strict: true,
  locale: "en",
  trim: true,
};

// ROUTES
// ------------ GET:ALL POSTS
postsRouter.get("/", (req, res) => {
  // get all posts from mongo
  // res.send(posts);
  getAll(req, res);
});

// ------------ GET:POST BY ID
postsRouter.get("/:id", (req, res) => {
  // get singular post by id from mongo
  const post = "";

  if (!post) {
    res.sendStatus(400);
  }

  res.send(post);
});

// ------------ POST:CREATE POST
postsRouter.post("/", (req, res) => {
  try {
    const post = {
      slug: slugify(req.body.title, slugopt),
      ...req.body,
    };

    // insert post to mongo db

    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ PUT:UPDATE POST
postsRouter.put("/:id", (req, res) => {
  try {
    // get post by id
    // update post
    // res with returned document
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ DELETE:DELETE POST
postsRouter.delete("/:id", (req, res) => {
  // delete post by id

  res.sendStatus(200);
});

export default postsRouter;
