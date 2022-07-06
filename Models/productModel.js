const mysql = require("mysql");

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_project'
});

db.connect((err)=>{
    if(err) console.log(err);
    else console.log('MySQL Product DB Connected')
})

// let sql='create table products(id int AUTO_INCREMENT,title varchar(256),image text, price int(5),description varchar(256),PRIMARY KEY (id))';
// db.query(sql);

module.exports = db;