//jwt is basically used to authorise user
const jwt = require("jsonwebtoken");
// it has payload which contain user information secret-key and jwt.sign will token based on payload and secret-key .
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;