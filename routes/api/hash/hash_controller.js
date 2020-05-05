const fs = require("fs");

//const bodyParser = require("body-parser");





const hashList = [];

exports.hashAdd = (req, res) =>{
    console.log(req.body);
    hashList.push(req.body);
    res.json(hashList);
}
