const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require("../config/db.config")

const connection=mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var itemtable="CREATE TABLE IF NOT EXISTS user"
        connection.query(itemtable,function(err,result){
            console.log("Connect database");
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT * FROM user"
    connection.query(query,function(err,row){
        if(err){
            res.send("No user")
        }else{
            res.send(row)
        }
    })
})

router.post('/',(req,res)=>{
    const id=req.body.id
    const username=req.body.username
    const password=req.body.password
    const fullname=req.body.fullname
    const email=req.body.email
    
    var query="INSERT INTO user (id,username,password,fullname,email) VALUES (?,?,?,?,?)";

   connection.query(query,[id,username,password,fullname,email],(err)=>{
    if(err){
        res.send("User ALREADY save")
    }else{
        res.send("User save")
    }
})
console.log(req.body);
})

router.put('/',(req,res)=>{
    const id=req.body.id
    const username=req.body.username
    const password=req.body.password
    const fullname=req.body.fullname
    const email=req.body.email
 
    var query="UPDATE user SET username=?,password=?,fullname=?,email=? WHERE id=?";
    connection.query(query,[username,password,fullname,email,id],(err,row)=>{
      if(err)throw err;
      res.send(row)
       })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    var query="DELETE FROM user WHERE id=?";
    connection.query(query,[id],(err,row)=>{
        if(err){
            res.send("User Not Found")
        }else{
            res.send("User Delete")
            res.send(row)
        }
       })

})

router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM user WHERE id=?";

    connection.query(query[id],(err,row)=>{
        if(err){
            res.send("User Not Found")
        }else{
            res.send(row)
        }
    })
})

module.exports=router