const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/userController')
const {createBook,getBooks,booksById} =require("../Controllers/bookController")

router.post('/register', createUser)
router.post('/login', loginUser)

//................................BOOKS API....................................................//
router.post('/books',createBook)
router.get('/books',getBooks) 
router.get('/books/:bookId',booksById) 




module.exports = router