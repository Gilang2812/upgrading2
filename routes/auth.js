const { login, refreshToken } = require("../controllers/auth");

const auth = require("express").Router();
auth.get('/login',login)
auth.get('/refresh',refreshToken)

module.exports = auth;
