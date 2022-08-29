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
    const discription=req.body.discription
    const price=req.body.price
    const catagory=req.body.catagory
    const qtyonhand=req.body.qtyonhand
    
    var query="INSERT INTO item (id,title,discription,price,catagory,qtyonhand) VALUES (?,?,?,?,?,?)";

   connection.query(query,[id,title,discription,price,catagory,qtyonhand],(err)=>{
    if(err){
        res.send("Item ALREADY save")
    }else{
        res.send("Item save")
    }
})
console.log(req.body);
})

router.put('/',(req,res)=>{
    const id=req.body.id
    const title=req.body.title
    const discription=req.body.discription
    const price=req.body.price
    const catagory=req.body.catagory
    const qtyonhand=req.body.qtyonhand
 
    var query="UPDATE item SET title=?,discription=?,price=?,catagory=?,street=?,qtyonhandid=? WHERE id=?";
    connection.query(query,[title,discription,price,catagory,qtyonhand,id],(err,row)=>{
      if(err)throw err;
      res.send(row)
       })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    var query="DELETE FROM item WHERE id=?";
    connection.query(query,[id],(err,row)=>{
        if(err){
            res.send("Item Not Found")
        }else{
            res.send("Item Delete")
            res.send(row)
        }
       })

})

router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM item WHERE id=?";

    connection.query(query[id],(err,row)=>{
        if(err){
            res.send("Item Not Found")
        }else{
            res.send(row)
        }
    })
})

module.exports=router
