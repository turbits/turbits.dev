import { ConnectToDatabase } from "../lib/ConnectToDatabase.mjs";
import { Router } from "express";
import mongoose from "mongoose";

class Controller {
  constructor(model) {
    this.model = model;
    this.router = Router();
  }

  jsonResponse = (res, code, message) => {
    return res.status(code).json({ message });
  };

  getAll = async (req, res) => {
    if (!req.method === "GET") this.r_methodNotAllowed();

    await ConnectToDatabase();

    try {
      const data = await this.model.find({});
      return res.status(200).json(data);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  getById = async (req, res) => {
    if (!req.method === "GET") this.r_methodNotAllowed();

    await ConnectToDatabase();

    try {
      const data = await this.model.findById(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  create = async (req, res) => {
    if (!req.method === "POST") this.r_methodNotAllowed();

    await ConnectToDatabase();

    try {
      const post = new this.model(req.body);
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  update = async (req, res) => {
    if (!req.method === "PUT") this.r_methodNotAllowed();

    await ConnectToDatabase();

    try {
      const {
        params: { id },
        body,
      } = req;
      console.log(id);
      console.log(body);
      const data = await this.model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).json(data);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  delete(req, res) {}

  r_ok = (res, dto) => {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  };

  r_unspecified = (res, message) => {
    return this.jsonResponse(res, 400, (message = "🟥 Unspecified error"));
  };

  r_unauthorized = (res, message) => {
    return this.jsonResponse(res, 401, (message = "🟥 Unauthorized"));
  };

  r_forbidden = (res, message) => {
    return this.jsonResponse(res, 403, (message = "🟥 Forbidden"));
  };

  r_notFound = (res, message) => {
    return this.jsonResponse(res, 404, (message = "🟥 Not found"));
  };

  r_methodNotAllowed = (res, message) => {
    return this.jsonResponse(res, 405, (message = "🟥 Method not allowed"));
  };

  r_conflict = (res, message) => {
    return this.jsonResponse(res, 409, (message = "🟥 Conflict"));
  };

  r_fail = (res, message) => {
    console.log(`🟥 Internal server error: ${message}`);
    return this.jsonResponse(res, 500, (message = "🟥 Internal server error"));
  };

  r_reqlimit = (res, message) => {
    return this.jsonResponse(res, 429, (message = "🟥 Too many requests"));
  };
}

export default Controller;
