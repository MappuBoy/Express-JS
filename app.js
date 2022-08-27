const customer=require('./routes/customer')
const express=require('express')
const app=express()
const port=4000

app.use('/customer',customer)
app.listen(port,()=>{
    console.log(`example at listing port ${port}`)
})