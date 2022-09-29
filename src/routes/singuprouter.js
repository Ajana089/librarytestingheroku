const express = require('express'); 
const signuprouter=express.Router();
const signupdata=require('../model/signupdata')
const bcrypt=require('bcrypt');//to encrypt password



signuprouter.post('/api/signup',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    
    //encryption password using bcrypt
    bcrypt.hash(req.body.user.password,10,(err,hash)=>{
        if(err){
            return res.json({success:false,message:'Give password'})
        }

        else
        {
            var user={
                name:req.body.user.name,
                email:req.body.user.email,
                password:hash,
                number:req.body.user.number
            }
            console.log(user)  ;
        
        
           console.log(user)
            const usersign = new signupdata(user);
            usersign.save((err,d)=>{
                if(err){
                    res.status(401).json({
                        message: 'Failed to create new user'
                    })
                } else{
                    res.status(200).json({
                        message: 'User created'
                    })
                }
            })
          
 
        } })
})

       



signuprouter.post('/api/login',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    signupdata.find({email:req.body.user.email})
    .exec()
    .then((result)=>{
           if(result.length<1){
          return  res.status(404).res.json({success:false,message:'user not found'})
           }
           const user1=result[0];
            

           //comparing pasword

           bcrypt.compare(req.body.user.password,user1.password,(err,ret)=>{
            if(ret){
              return res.status(200).json({success:true,message:"you are succcessfully login"})
            }
            else{

                return res.status(404).json({success:false,message:"Password is not matching"})

            }


           })


    }).
    catch((err)=>{
        res.json({success:false,message:'err'})
    })


})







module.exports=signuprouter;
