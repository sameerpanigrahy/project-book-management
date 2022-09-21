const bookModel=require("../models/bookModel")
const userModel=require("../models/userModel")
const mongoose=require('mongoose')

const {isValidRequestBody}=require("../validator/validation")

const createBook=async function(req,res){
     try {
        



        

     } catch (err) {
        res.status(500).send({status:false,message:err.message})
     }


}


