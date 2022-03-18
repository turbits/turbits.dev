import { ConnectToDatabase } from "../../lib/ConnectToDatabase.mjs";
import { Router } from "express";
import mongoose from "mongoose";

class Controller {
  constructor(model) {
    this.model = model;
    this.router = Router();
  }

  json = (res, code, message) => {
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
      const newDoc = new this.model(req.body);
      const data = await newDoc.save();
      console.log(data);
      return {
        code: 201,
        data: data,
      };
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
      const data = await this.model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).json(data);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  delete = async (req, res) => {
    if (!req.method === "DELETE") this.r_methodNotAllowed();

    await ConnectToDatabase();

    try {
      await this.model.findByIdAndDelete(req.params.id);
      return res.sendStatus(200);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  r_ok = (res, dto) => {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  };

  r_unspecified = (res) => {
    return this.json(res, 400, "🟥 Unspecified error");
  };

  r_unauthorized = (res) => {
    return this.json(res, 401, "🟥 Unauthorized");
  };

  r_forbidden = (res) => {
    return this.json(res, 403, "🟥 Forbidden");
  };

  r_notFound = (res) => {
    return this.json(res, 404, "🟥 Not found");
  };

  r_methodNotAllowed = (res) => {
    return this.json(res, 405, "🟥 Method not allowed");
  };

  r_conflict = (res) => {
    return this.json(res, 409, "🟥 Conflict");
  };

  r_fail = (res) => {
    console.log("🟥 Internal server error");
    return res.status(500).json(res, 500, "🟥 Internal server error");
  };

  r_reqlimit = (res) => {
    return this.json(res, 429, "🟥 Too many requests");
  };
}

export default Controller;
