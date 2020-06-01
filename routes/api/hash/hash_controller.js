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

const getChatID = function(hashList, callback){
    let chatIDarray = new Array(); //리턴할 chatID가 담긴 배열
    let ihashNum = hashList.length; //hash의 갯수
    //SQL문 where에 들어갈 hashList
    let strhashIn = "(";
    for (var i = 0; i < hashList.length; i++){
        strhashIn += '\'';
        strhashIn += hashList[i].hash;
        strhashIn += '\'';
           if (i < hashList.length - 1){
                strhashIn += ',';
        }
    }
    strhashIn += ')';
    //데이터베이스 연결하여 hash목록을 모두 포함한 생성되어 있는 chatID를 chatIDarray에 push
    connection.query("SELECT chatID FROM HashTagUsed WHERE hash IN " + strhashIn + "GROUP BY chatID HAVING COUNT(DISTINCT hash) = " + ihashNum +";",function(err, row, fields){
        for(let i = 0; i < row.length; i++){
            chatIDarray.push(row[i].chatID);
            
        }
   
        callback(chatIDarray);
    });
   
}


//hashList를 모두 포함하는 채팅방들의 chatID 배열로 리턴
exports.chatList = (req, res) =>{
    let uID = req.body.uID; //user의 ID
    let hashList = req.body.hashList;
    //chatID들을 받아왔을때 채팅방에 대한 정보를 가져온다.
    getChatID(hashList, function(row){
        let chatIDarray = row;
        let chatIDsql = "select * from ChatList where chatID IN (" + row + ");"; //SQL문
        connection.query(chatIDsql, function(err, row, fields){
            console.log(row); //단순출력
        });
    });
   
    
}
exports.roomCreate = (req, res) =>{
    let ruID = req.body.ruid;

} 