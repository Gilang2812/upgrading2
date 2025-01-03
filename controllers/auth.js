const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const generateToken = (user) => {
  const token = jwt.sign({user}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body; 
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username " });
    }
    const matches = await await bcrypt.compare(password,user.password);
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
    const header = req.headers.authorization
    const token = header && header.split(" ")[1];

    if(!token) return res.sendStatus(403)
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,
      (err,user)=>{
        if(err) return res.status(403).json({message: "unauthorized"});
        const newToken = generateToken(user);
        res.json({message: "Token refreshed", token: newToken});
      }
    )
    
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
};
const register = async (req, res) => {
  try {
    const {username,email,password} =req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    return res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
};

module.exports = { login, refreshToken, register };