const express = require('express'); 
const bookrouter=express.Router();
const bookdata=require('../model/books')

bookrouter.post('/api/addbook',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
 var book={ 
    name:req.body.name,
    author:req.body.author,
    description:req.body.description,
    remark:req.body.remark


 }

 var addbook = new bookdata(book);
 addbook.save();

})

bookrouter.get('/api/getbook',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    bookdata.find()
    .then(function(books){
        res.send(books);
        console.log(books)
    });
})

bookrouter.get('/api/:id',(req, res) => {

    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    const id = req.params.id;
      bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })

bookrouter.put('/api/update',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    console.log(req.body)
    id=req.body._id,
    name= req.body.name,
    author = req.body.author,
    description = req.body.description,
    remark = req.body.remark
   
   bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{"name":name,
                                "author":author,
                                "description":description,
                                "remark":remark,
                                }})
   .then(function(){
       res.send();
   })
 })
 
bookrouter.delete('/api/remove/:id',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
   id = req.params.id;
   bookdata.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })
   








module.exports=bookrouter;