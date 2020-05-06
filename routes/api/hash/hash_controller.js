const fs = require("fs");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require('mysql');
const _url = require('url');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

exports.hashAdd = (req, res) =>{
    const hashList = [];
    console.log(req.body);
    hashList.push(req.body);
    res.json(hashList);
}

exports.ChatList = (req, res) =>{
    let uID = req.query.id;
    let hashList = req.query.hashList;
    let chatList;
    if(hashList == null){
        connection.query("select * from ChatList where chatID IN (select chatID from ChatMember where uID =" + uID + ");", function(err, row, fields){
            res.send(row);
            console.log(row);
           
        });
    }
}   

