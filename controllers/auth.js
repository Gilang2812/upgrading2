const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const login = async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username " });
    }
    const matches = await await bcrypt.verify(user.password, password);
    if (!matches) return res.status(401).json({ message: "password salah" });

    const token = generateToken(user);
    res.json({ message: "Login success", token });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
};

const refreshToken = async (req, res) => {
  try {
    const header = req.headers.authorization.split(" ")[1];
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
};
const register = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
};

module.exports = { login, refreshToken, register };