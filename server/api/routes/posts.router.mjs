import PostController from "../controllers/PostController.mjs";
import { Router } from "express";
import mg from "mongoose";
import slugify from "slugify";

const PostRouter = Router();

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
PostRouter.get("/", (req, res) => {
  PostController.getAll(req, res);
});

// ------------ GET:POST BY ID
PostRouter.get("/:id", (req, res) => {
  PostController.getById(req, res);
});

// ------------ POST:CREATE POST
PostRouter.post("/", (req, res) => {
  const slug = slugify(req.body.title, slugopt);
  const _req = {
    ...req,
    body: {
      ...req.body,
      slug,
    },
  };
  PostController.create(_req, res);
});

// ------------ PUT:UPDATE POST
PostRouter.put("/:id", (req, res) => {
  const updatedAt = Date.now();
  const slug = slugify(req.body.title, slugopt);
  const _req = {
    ...req,
    body: {
      ...req.body,
      slug,
      updatedAt,
    },
  };
  PostController.update(_req, res);
});

// ------------ DELETE:DELETE POST
PostRouter.delete("/:id", (req, res) => {
  // delete post by id
  console.log("delete");

  res.sendStatus(200);
});

export default PostRouter;
