export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.administrator) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not an administrator",
    });
  }
};
