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
      const {
        query: { id },
      } = req;
      const data = this.model.findById(id);
      return res.status(200).json(data);
    } catch (error) {
      return this.r_fail(res, error);
    }
  };

  create(req, res) {}

  update(req, res) {}

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
    return this.jsonResponse(res, 400, (message = "🟥 API: Unspecified error"));
  };

  r_unauthorized = (res, message) => {
    return this.jsonResponse(res, 401, (message = "🟥 API: Unauthorized"));
  };

  r_forbidden = (res, message) => {
    return this.jsonResponse(res, 403, (message = "🟥 API: Forbidden"));
  };

  r_notFound = (res, message) => {
    return this.jsonResponse(res, 404, (message = "🟥 API: Not found"));
  };

  r_methodNotAllowed = (res, message) => {
    return this.jsonResponse(
      res,
      405,
      (message = "🟥 API: Method not allowed")
    );
  };

  r_conflict = (res, message) => {
    return this.jsonResponse(res, 409, (message = "🟥 API: Conflict"));
  };

  r_fail = (res, message) => {
    console.log(`🟥 API: Internal server error: ${message}`);
    return this.jsonResponse(
      res,
      500,
      (message = "🟥 API: Internal server error")
    );
  };

  r_reqlimit = (res, message) => {
    return this.jsonResponse(res, 429, (message = "🟥 API: Too many requests"));
  };
}

export default Controller;
