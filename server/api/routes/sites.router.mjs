import { isAdmin, isAuth } from "../middleware/AuthMiddleware.mjs";

import { GeneratePassword } from "../../lib/PasswordUtilities.mjs";
import { Router } from "express";
import UserController from "../controllers/UserController.mjs";
import passport from "passport";

const SiteRouter = Router();

// ===================== POST ROUTES =====================
SiteRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login-failure",
    successRedirect: "login-success",
  })
);

SiteRouter.post("/register", (req, res) => {
  const _saltHash = GeneratePassword(req.body.password);

  const _salt = _saltHash.salt;
  const _hash = _saltHash.hash;

  const _req = {
    ...req,
    body: {
      ...req.body,
      username: req.body.username,
      salt: _salt,
      hash: _hash,
      administrator: true,
    },
  };

  res.redirect("/login");
  const _res = UserController.create(_req, res);
  res.status(_res.code).json(_res.body);
});

// ===================== GET ROUTES =====================
// ------------ HOME
SiteRouter.get("/", (req, res) => {
  res.send(`
  <h1>Home</h1>
  <p>
    Please <a href="/register">register</a>
  </p>`);
});

// ------------ LOGIN
SiteRouter.get("/login", (req, res) => {
  const form = `
  <h1>Login Page</h1>
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <button type="submit">Login</button>
    </form>
  `;
  console.log(req.body);
  res.send(form);
});

// ------------ REGISTER
SiteRouter.get("/register", (req, res) => {
  const form = `
  <h1>Register Page</h1>
    <form action="/register" method="post">
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <button type="submit">Register</button>
    </form>
  `;
  res.send(form);
});

// ------------ PROTECTED ROUTE EXAMPLE
SiteRouter.get("/protected-route", isAuth, (req, res) => {
  res.send(`
    <h1>Protected Route</h1> <p><a href="/logout">Logout</a></p>
    `);
});

// ------------ ADMIN ROUTE EXAMPLE
SiteRouter.get("/admin-route", isAdmin, (req, res) => {
  res.send(`
  <h1>Admin Route</h1> <p><a href="/logout">Logout</a></p>
  `);
});

// ------------ LOGOUT
SiteRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// ------------ LOGIN SUCCESS
SiteRouter.get("/login-success", (req, res) => {
  res.send(`
  <p>You successfully logged in. <a href="/protected-route">Go to protected route</a></p>`);
});

// ------------ LOGIN FAILURE
SiteRouter.get("/login-failure", (req, res) => {
  res.send(`
  <p>Your credentials did not match our records. <a href="/login">Try again</a></p>
  `);
});

export default SiteRouter;
