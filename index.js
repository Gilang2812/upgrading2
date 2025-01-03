require('dotenv').config()
const express = require("express");
const db = require("./config/db");
const route = require('./routes/index') 


const PORT = process.env.PORT; 
 
const app = express();

app.use(express.json())
app.use(route)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});