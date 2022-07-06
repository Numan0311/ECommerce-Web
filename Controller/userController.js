const express=require('express')
const userDB=require('../Models/userModel');
const bcrypt = require('bcrypt');


module.exports.addNewUser= function(req,res) {
    let exist = false;
    let sql = 'select * from users where username= ? ';
    userDB.query(sql, req.body.username, (err, result) => {
        if (result.length >= 1) {
            exist = true;
        } else {
            exist = false;
        }

        if (!exist) {
            // bcrypt.hash(req.body.password, 10, function (err, hash) {
            //     req.body.password = hash;
            //     console.log(req.body.password)
            // });

            if (!req.body.role) req.body.role = 'user';
            sql = 'insert into users set ?';
            userDB.query(sql, req.body, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).json('Error Creating User');
                } else {
                    res.status(201).json(`User Created Successfully`);
                }
            })
        } else {
            res.status(400).json('username already taken');
            res.end()
        }
        // res.end();
    })
}

module.exports.login=function (req,res){
    // console.log(req.body.username,req.body.password)
    let sql=`select * from users where username= '${req.body.username}' and password= '${req.body.password}'`;
    userDB.query(sql,(err,result)=>{
        if(result.length===0){
            // console.log(result[0].role);
            res.send("User Doesn't Exist");
        }
        else{
            if(result[0].role==='user'){
                res.send("You Don't have access");
            }
            else {
                console.log(result)
                return res.redirect('/dashboard');
            }
        }
    })
}