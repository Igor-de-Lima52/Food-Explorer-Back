const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(req, res, next){
  const authHeader = req.headers.authorization;
  // if(!authHeader.cookie){
  //   throw new AppError('JWT token não informado', 401);
  // }

  if(!authHeader){
    throw new AppError('JWT token não informado', 401);
  }
  // const [, token] = authHeader.cookie.split("token=");

  const [, token] = authHeader.split(" ");

  try{
    const { role , sub: user_id } = verify(token, authConfig.jwt.secret);
    req.user = {
      id: Number(user_id),
      role
    };

    return next();
  }catch{
    throw new AppError("Invalid JWT token", 401);
  }
}

module.exports = ensureAuthenticated;