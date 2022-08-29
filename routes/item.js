const express =require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require('../config/db.config')

const connection=mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var itemtable="CREATE TABLE IF NOT EXISTS item"
        connection.query(itemtable,function(err,result){
            console.log("Connect database");
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT * FROM item"
    connection.query(query,function(err,row){
        if(err){
            res.send("No item")
        }else{
            res.send(row)
        }
    })
})

router.post('/',(req,res)=>{
    const id=req.body.id
    const title=req.body.title
    const price=req.body.price
    const catagory=req.body.catagory
    
})
