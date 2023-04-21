const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token ] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "BEarer"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    
    if (!user) {
      next(HttpError(401), "Not authorized");
    }
    next();
  } 
  catch {
    next(HttpError(401), "Not authorized");
  }
};

module.exports = authentication;
