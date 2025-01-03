const { login, refreshToken, register } = require("../controllers/auth");

const auth = require("express").Router();
auth.get('/login',login)
auth.get('/register',register)
auth.get('/refresh',refreshToken)

module.exports = auth;
