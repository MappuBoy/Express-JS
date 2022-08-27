const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require('../config/db.config')

const connection=mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var customertable="CREATE TABLE IF NOT EXISTS customer(id varchar(255) PRIMARY KEY,name varchar(255))"
    connection.query(customertable,function(err,result){
        console.log("Connect database");
    })
    }
})
router.get('/',(req,res)=>{
    var query="SELECT * FROM customer"
    connection.query(query,function(err,row){
        if(err){
            res.send("No custmoer")
        }else{
            res.send(row)
        }
    })
})

router.post('/',(req,res)=>{
   const id=req.body.id
   const name=req.body.name

   var query="INSERT INTO customer (id,name) VALUES (?,?)";

   connection.query(query,[id,name],(err)=>{
    if(err){
        res.send("Customer ALREADY save")
    }else{
        res.send("Customer save")
    }
   })
   console.log(req.body);
})
router.put('/',(req,res)=>{
    const id=req.body.id
    const name=req.body.name
 
    var query="UPDATE customer SET name=? WHERE id=?";
    connection.query(query,[name,id],(err,row)=>{
      if(err)throw err;
      res.send(row)
       })
})
router.delete('/:id',(req,res)=>{
    const id=req.params.id
    var query="DELETE FROM customer WHERE id=?";
    connection.query(query,[id],(err,row)=>{
        if(err){
            res.send("Customer Not Found")
        }else{
            res.send("Customer Delete")
            res.send(row)
        }
       })

})
router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM customer WHERE id=?";

    connection.query(query[id],(err,row)=>{
        if(err){
            res.send("Customer Not Found")
        }else{
            res.send(row)
        }
    })
})
module.exports=router

