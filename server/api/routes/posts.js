const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const mg = require("mongoose");

// OPTIONS
const slugopt = {
  replacement: "-",
  remove: /[$*_+~.()'"!\-:@]/g,
  lower: true,
  strict: true,
  locale: "en",
  trim: true,
};

/**
 *  @swagger
 *    components:
 *      schemas:
 *        Post:
 *          type: object
 *            required:
 *              - slug
 *              - title
 *              - author
 *              - body
 *              - createdAt
 *          properties:
 *            _id:
 *              type: ObjectId
 *              description: The generated document ObjectId
 *            title:
 *              type: string
 *              description: The post title
 *            author:
 *              type: string
 *              description: The post author
 *            body:
 *              type: string
 *              description: The post body
 *            createdAt:
 *              type: string
 *              format: date-time
 *              description: The date the post was created
 *            updatedAt:
 *              type: string
 *              format: date-time
 *              description: The date the post was last updated
 *            slug:
 *              type: string
 *              description: The post slug
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *                description: The post tags
 *            headerImage:
 *              $ref: '#/components/schemas/Image'
 *              description: The post header image
 *              required: false
 *              default: null
 *          example:
 *            id: d5fE_asz
 *            title: The New Turing Omnibus
 *            author: Alexander K. Dewdney
 */

// ROUTES
// ------------ GET:ALL POSTS
router.get("/", (req, res) => {
  // get all posts from mongo
  // res.send(posts);
});

// ------------ GET:POST BY ID
router.get("/:id", (req, res) => {
  // get singular post by id from mongo
  const post = "";

  if (!post) {
    res.sendStatus(400);
  }

  res.send(post);
});

// ------------ POST:CREATE POST
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  try {
    // get post by id
    // update post
    // res with returned document
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ------------ DELETE:DELETE POST
router.delete("/:id", (req, res) => {
  // delete post by id

  res.sendStatus(200);
});

module.exports = router;
