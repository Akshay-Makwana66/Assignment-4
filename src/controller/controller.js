const userModel = require("../model/userModel");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
 const aws_config = require('../util/aws_config.js')
var saltRounds= 10;

const registrationOfUser = async (req,res)=>{
    try{
         let data = req.body;
         let files = req.files;  
         if(files.length>0){
             data.photo = await aws_config.uploadFile(files[0]);        
            }
            data.password = await bcrypt.hash(data.password, saltRounds);
                   
        let savedData = await userModel.create(data);
        res.status(201).send({msg:"Your registration is successfully done, ThankYou", data: savedData})
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"sorry for inconvenience", Error: error})
    }
};


const loginUser = async (req,res)=>{
    try{
        let data = req.body         

        // Checks whether body is empty or not
        if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});
    
        // Checks whether email is entered or not
        if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail"});
        let userEmail= data.email
    
         // Checks whether password is entered or not
        if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" }); 
       
        let userPassword= data.password
    
        let checkingUserEmailInDB= await userModel.findOne({email: userEmail})
        if(!checkingUserEmailInDB) return res.status(401).send({status:false, msg:"Email is incorrect"})
        let decryptPassword =  bcrypt.compare(userPassword, checkingUserEmailInDB.password);
    
        if (!decryptPassword) {  
          return res
            .status(401)
            .send({ status: false, message: "Password is not correct" });
        }
    
        //Creating token if e-mail and password is correct
        let token= jwt.sign({
          userId: checkCred._id.toString(),
        }, "Assignment-4");
        //Setting token in response header
        res.setHeader("x-api-key",token)
        res.status(201).send({status:true,data: token})
      }
    catch(error){
        res.status(500).send({msg:"sorry for inconvenience", Error: message.error})
    }
}

const getUserInfo = async (res)=>{
    try{
        let getDataOfUser = await userModel.find();
        if (getDataOfUser.length == 0)return res.status(404).send({ status: false, msg: "No userData found" });
        res.status(200).send({msg:"This is the list of user", data: getDataOfUser})
    }
    catch(error){
        res.status(500).send({msg:"sorry for inconvenience", Error: message.error})
    }
};

const userCanUploadDocuments = async (req,res)=>{
    try{
        let storingUserId = req.params.userId
        let data = req.body;
        let files = req.files;
        let {name,email, password, phoneNumber,photo,document} = data;
        if(files.length>0){
            data.photo = await aws_config.uploadFile(files[0]);        
           }   
           data.password = await bcrypt.hash(data.password, saltRounds);
               
        let uploadingDocument = await userModel.findOneAndUpdate({_id:storingUserId},data,{new:true})

        res.status(200).send({msg:"Your Document is successfully uploaded", data: uploadingDocument})
    }
    catch(error){
        res.status(500).send({msg:"sorry for inconvenience", Error: message.error})
    }
}

const deleteUser = async (req,res)=>{
    try{
        let pathParamsId = req.params.userId;
        let checkingIdIsPresentOrNotAndSetDelete = await userModel.findOneAndUpdate({_id: pathParamsId,isdeleted:false},{isdeleted:true})
        if(!checkingIdIsPresentOrNotAndSetDelete) return res.status(404).send({msg:"no user found"})
        res.status(200).send({msg:"Your account is successfully deleted", data: checkingIdIsPresentOrNotAndSetDelete})
    }
    catch(error){
        res.status(500).send({msg:"sorry for inconvenience", Error: message.error})
    }
}




module.exports= {registrationOfUser,loginUser,getUserInfo,userCanUploadDocuments,deleteUser}