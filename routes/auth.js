const { login, refreshToken, register } = require("../controllers/auth");

const auth = require("express").Router();
auth.post('/login',login)
auth.post('/register',register)
auth.post('/refresh',refreshToken)

module.exports = auth;
