const customer=require('./routes/customer')
const item=require('./routes/item')
const express=require('express')
const app=express()
const port=4000

app.use(express.json())

app.use('/customer',customer)
app.use('/item',item)
app.listen(port,()=>{
    console.log(`example at listing port ${port}`)

})