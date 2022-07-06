const mysql = require("mysql");

const userDB=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_project'
});

userDB.connect((err)=>{
    if(err) console.log(err);
    else console.log('MySQL User DB Connected')
})
//
// let sql='create table users(id int AUTO_INCREMENT,username varchar(40),name varchar(256),email varchar(50), password varchar(50),role varchar(256),PRIMARY KEY (id,username))';
// userDB.query(sql);

module.exports = userDB;