const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const mongoose = require('mongoose')
const moment=require('moment')

const { isValid, isValidRequestBody,isValidfild,isValidName, validDate,validRating } = require("../validator/validation")


const createReview = async function (req, res) {
try {
    const bookId=req.params.bookId
                         
    if (!mongoose.isValidObjectId(bookId)) return res.status(406).send({ status: false, message: `${bookId} This bookId is not ObjectId type` })

    const data = req.body
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: " body cant't be empty Please enter some data." })

        const { reviewedBy,reviewedAt,rating,review,isDeleted} = data
         data["bookId"]=bookId
        
        if (!isValidfild(reviewedBy)) return res.status(400).send({ status: false, message: "viewer can't be a empty String" })
        if (!isValid(rating)) return res.status(400).send({ status: false, message: "rating is  required" })
        if (!isValidfild(review)) return res.status(400).send({ status: false, message: "review can't be a empty String " })
                                 
        
        const validBook = await bookModel.findOne({isDeleted:false,_id:bookId})
        if (!validBook) return res.status(400).send({ status: false, message: `Book not found by this ${bookId} Id ` })

        if(reviewedBy){
        if (!isValidName.test(reviewedBy)) return res.status(406).send({
            status: false, msg: "Enter a valid reviewer Name",
            validname: "length of name has to be in between (3-20)  , use only String "
        })}
        if(reviewedAt){
            if (!validDate.test(reviewedAt)) return res.status(406).send({ status: false, message: 'Plese enter a  release Date YYYY-MM-DD format' })
        }else{  data["reviewedAt"]=moment().format('YYYY MM DD')}

        if(!validRating.test(rating) ) return res.status(400).send({ status: false, message: `${rating} This was not a valied rating,rating this book in between 0-5 ` })


        if (isDeleted == true) return res.status(400).send({ status: false, message: "you can't delete a review while creating" })

      const reviewDta= await reviewModel.create(data)
      let updatebook=await bookModel.findByIdAndUpdate({_id:bookId},{$inc:{reviews:+1}},{new:true})

      res.status(201).send({status:true,message:"you review Was recorded",data:reviewDta})

} catch (error) {
    res.status(500).send({status:false,message:error.message})
}
}







module.exports={createReview}