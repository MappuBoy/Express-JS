const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require('../config/db.config')

const connection=mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var customertable="CREATE TABLE IF NOT EXISTS customer(id varchar(255),name varchar(255))"
    connection.query(customertable,function(err,result){
        console.log("Connect database");
    })
    }
})
module.exports=router

