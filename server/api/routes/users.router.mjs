import { Router } from "express";
import UserController from "../controllers/UserController.mjs";

const UserRouter = Router();

// Routes
// ------------ GET:ALL USERS
UserRouter.get("/", (req, res) => {
  UserController.getAll(req, res);
});

// ------------ GET:USER BY ID
UserRouter.get("/:id", (req, res) => {
  UserController.getById(req, res);
});

// ------------ POST:CREATE USER
UserRouter.post("/", (req, res) => {
  UserController.create(req, res);
});

// ------------ PUT:UPDATE USER BY ID
UserRouter.put("/:id", (req, res) => {
  const updatedAt = Date.now();
  const _req = {
    ...req,
    body: {
      ...req.body,
      updatedAt,
    },
  };
  UserController.update(_req, res);
});

// ------------ DELETE:DELETE USER BY ID
UserRouter.delete("/:id", (req, res) => {
  UserController.delete(req, res);
});

export default UserRouter;
