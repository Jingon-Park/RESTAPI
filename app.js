const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const user = require("./routes/api/user/index");


app.use('/users', user);

app.listen(3000, ()=>{
    console.log("server running");
});

module.exports = app;