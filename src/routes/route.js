const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/userController')
const { createBook, getBooks, booksById } = require("../Controllers/bookController")
const { authenticate } = require("../middlewares/auth")

router.post('/register', createUser)
router.post('/login', loginUser)

//................................BOOKS API....................................................//
router.post('/books', authenticate, createBook)
router.get('/books', authenticate, getBooks)
router.get('/books/:bookId', authenticate, booksById)




module.exports = router