const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require('../config/db.config')

const connection=mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var itemtable="CREATE TABLE IF NOT EXISTS order"
        connection.query(itemtable,function(err,result){
            console.log("Connect database");
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT * FROM order"
    connection.query(query,function(err,row){
        if(err){
            res.send("No Order")
        }else{
            res.send(row)
        }
    })
})

router.post('/',(req,res)=>{
    const id=req.body.id
    const customernamee=req.body.customernamee
    const date=req.body.date
    const title=req.body.title
    const qty=req.body.qty
    const cost=req.body.cost
    
    var query="INSERT INTO order (id,customernamee,date,title,qty,cost) VALUES (?,?,?,?,?,?)";

   connection.query(query,[id,customernamee,date,title,qty,cost],(err)=>{
    if(err){
        res.send("Order ALREADY save")
    }else{
        res.send("Order save")
    }
})
console.log(req.body);
})

router.put('/',(req,res)=>{
    const id=req.body.id
    const customernamee=req.body.customernamee
    const date=req.body.date
    const title=req.body.title
    const qty=req.body.qty
    const cost=req.body.cost
 
    var query="UPDATE order SET customernamee=?,date=?,title=?,qty=?,cost=? WHERE id=?";
    connection.query(query,[customernamee,date,title,qty,cost,id],(err,row)=>{
      if(err)throw err;
      res.send(row)
       })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    var query="DELETE FROM order WHERE id=?";
    connection.query(query,[id],(err,row)=>{
        if(err){
            res.send("Order Not Found")
        }else{
            res.send("Order Delete")
            res.send(row)
        }
       })

})

router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM order WHERE id=?";

    connection.query(query[id],(err,row)=>{
        if(err){
            res.send("Order Not Found")
        }else{
            res.send(row)
        }
    })
})

module.exports=router
