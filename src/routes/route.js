const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/userController')
const { createBook, getBooks, booksById,deleteBook } = require("../Controllers/bookController")
const {createReview}  =require("../Controllers/reviewController")
const { authenticate } = require("../middlewares/auth")


//..............................Test API.........................//

router.get("/test-me" , function(req,res){
    res.status(200).send({status:true,message:"Testing API"})
})


//........................................User API............................................//


router.post('/register', createUser)
router.post('/login', loginUser)

//................................BOOKS API....................................................//


router.post('/books', authenticate, createBook)
router.get('/books', authenticate, getBooks)
router.get('/books/:bookId', authenticate, booksById)
router.delete('/books/:bookId',authenticate, deleteBook)

//...................................Review API..........................................//


router.post('/books/:bookId/review',createReview)





router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })



module.exports = router