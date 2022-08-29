const express=require('express')
const router=express.Router()
const mysql=require('mysql')
const db=require('../config/db.config')

const connection=mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var customertable="CREATE TABLE IF NOT EXISTS customer(id varchar(255) PRIMARY KEY,firstname varchar(255), lastname varchar(255), email varchar(255), city varchar(255), street varchar(255), streetnumber varchar(255), zipcode varchar(255), latvalue varchar(255), longvalue varchar(255), mobilenumber varchar(255))"
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
    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const email=req.body.email
    const city=req.body.city
    const street=req.body.street
    const streetnumber=req.body.streetnumber
    const zipcode=req.body.zipcode
    const latvalue=req.body.latvalue
    const longvalue=req.body.longvalue
    const mobilenumber=req.body.mobilenumber
 
   var query="INSERT INTO customer (id,firstname,lastname,email,city,street,streetnumber,zipcode,latvalue,longvalue,mobilenumber) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

   connection.query(query,[id,firstname,lastname,email,city,street,streetnumber,zipcode,latvalue,longvalue,mobilenumber],(err)=>{
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
    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const email=req.body.email
    const city=req.body.city
    const street=req.body.street
    const streetnumber=req.body.streetnumber
    const zipcode=req.body.zipcode
    const latvalue=req.body.latvalue
    const longvalue=req.body.longvalue
    const mobilenumber=req.body.mobilenumber
 
    var query="UPDATE customer SET firstname=?,lastname=?,email=?,city,street=?,streetnumber=?,zipcode=?,latvalue=?,longvalue=?,mobilenumber=? WHERE id=?";
    connection.query(query,[firstname,lastname,email,city,street,streetnumber,zipcode,latvalue,longvalue,mobilenumber,id],(err,row)=>{
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

