
import jwt from "jsonwebtoken";
import config from "../config";

const checkLogin = (req, res, next) => {
  if (req.path === "/api/user/auth" || req.path === "/api/user/create") {
    return next(); // Przepuść żądania do ścieżek logowania i tworzenia użytkowników
  }

  let token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return res.redirect("http://localhost:4200/login");
  }

  try {
    req.user = jwt.verify(token, config.JwtSecret);
    next();
  } catch (ex) {
    return res.redirect("http://localhost:4200/login");
  }
};

export default checkLogin;
