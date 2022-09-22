const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const mongoose = require('mongoose')

const { isValid, isValidRequestBody, validDate, validISBN } = require("../validator/validation")


const createBook = async function (req, res) {
    try {
        const data = req.body
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: " body cant't be empty Please enter some data." })

        const { title, excerpt, userId, ISBN, category, subcategory, reviews, isDeleted, releasedAt } = data

        if (!isValid(title)) return res.status(400).send({ status: false, message: "Title is required" })
        if (!isValid(excerpt)) return res.status(400).send({ status: false, message: "excerpt is  required" })
        if (!isValid(userId)) return res.status(400).send({ status: false, message: "userId id is required" })
        if (!isValid(ISBN)) return res.status(400).send({ status: false, message: " ISBN is required" })
        if (!isValid(category)) return res.status(400).send({ status: false, message: "category is required" })
        if (!isValid(subcategory)) return res.status(400).send({ status: false, message: "subcategory is required" })
        if (!isValid(releasedAt)) return res.status(400).send({ status: false, message: "releasedAt is required" })

        if (!mongoose.isValidObjectId(userId)) return res.status(406).send({ status: false, message: "userId is not in correct format" })
        const validUser = await userModel.findById(userId)
        if (!validUser) return res.status(400).send({ status: false, message: `user not found by this ${userId} userId ` })

        const unique = await bookModel.findOne({ $or: [{ title: title }, { ISBN: ISBN }] })
        if (unique) {
            if (unique.title == title) {
                return res.status(409).send({ message: `${title} is  alrady exist` })
            } else { return res.status(409).send({ message: `${ISBN}:--This ISBN is alrady exist  ` }) }

        }

        if (!validISBN.test(ISBN)) return res.status(406).send({ status: false, message: 'Plese enter valid ISBN' })

        if (!validDate.test(releasedAt)) return res.status(406).send({ status: false, message: 'Plese enter a  release Date YYYY-MM-DD format' })

        if (reviews) return res.status(406).send({ status: false, message: 'default value of reviews is 0 while book registering' })


        if (isDeleted == true) return res.status(400).send({ status: false, message: "you can't delete a blog while creating" })

        const book = await bookModel.create(data)
        res.status(201).send({ status: true, message: "Boook successfully created", data: book })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }


}



const getBooks = async function (req, res) {
    try {
        let data = req.query

        const { userId, category, subcategory } = data

        if (userId) {
            if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "please enter a correct userId" })
        }

        const getBook = { isDeleted: false }
        if (userId) getBook["userId"] = userId
        if (category) getBook["category"] = category
        if (subcategory) getBook["subcategory"] = subcategory

        if (data.isDeleted == true) return res.status(404).send({ status: false, message: "you can't find deleted books" })



        const books = await bookModel.find(getBook).select({ id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releaseAt: 1 })
        books.sort((a, b) => {
            let fa = a.title.toLowerCase()
            fb = b.title.toLowerCase()
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0
        })

        if (books.length == 0) return res.status(404).send({ status: false, message: "Book Not Found " })

        res.status(200).send({ status: true, message: "Books List", data: books })

    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// --------------------------------------------------------------------------------

const booksById = async function (req, res) {
    try {
        let id = req.params.bookId

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ status: false, message: "please enter a correct Id" })

        const findById = {
            _id: id,
            isDeleted: false
        }
        const findBook = await bookModel.findOne(findById).select({ __v: 0 })
        if (!findBook) return res.status(404).send({ status: false, message: "book's not found" })
        if (findBook.reviews == 0) {
            findBook._doc["reviewsData"] = []
        }
        res.status(200).send({ status: true, message: `I got This book by using this Id ==>>${id}`, Data: findBook })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}


module.exports = { createBook, getBooks, booksById }