const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const hash = require("./routes/api/hash/index");


app.use('/hash', hash);

app.listen(8080, ()=>{
    console.log("server running");
    console.log("TEST");
});

module.exports = app;