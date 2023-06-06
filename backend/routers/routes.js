// routes.js
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const User = require('../models/User');
const Book = require('../models/Book');
const Jwt = require('jsonwebtoken');
const UserBook = require('../models/UserBook');
const jwtkey = 'e-comm';

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            res.send({ result: 'Something went Wrong please try after sometime' })
        }
        res.send({ result, auth: token })
    })
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send({ result: 'Something went Wrong please try after sometime' })
                }
                res.send({ user, auth: token })

            })
        } else {
            res.send({ result: 'No User Found' })
        }
    } else {
        res.send({ result: 'No User Found' })
    }
})

router.post('/api/add-book', async (req, res) => {
    let book = await new Book(req.body)
    let result = await book.save();
    res.send(result)
})

router.get('/api/products', async (req, res) => {
    let products = await Book.find();
    res.send(products);
})

router.delete('/api/product/:id', async (req, res) => {
    console.log(req.params.id);
    let product = await Book.deleteOne({ _id: req.params.id })
    res.send(product)
})

router.get('/api/product/:id', async (req, res) => {
    console.log(req.params.id, "Find ids")
    let product = await Book.findOne({ _id: req.params.id })
    if (product) {
        res.send(product)
    } else {
        res.send({ result: 'No data found' })
    }
})

router.put('/api/product/:id', async (req, res) => {
    let result = await Book.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

router.get('/api/search/:key', async (req, res) => {
    console.log("api search key")
    let result = await Book.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ]
    })
    res.send(result)
})

router.post('/api/products/:id/:customerID', async (req, res) => {
    let userWiseBook = await UserBook.findOne({ user: req.params.customerID })

    if (userWiseBook === null) {
        let newBook = new UserBook({
            user: req.params.customerID,
            book: [{
                id: req.params.id
            }]
        })

        newBook.save()
    } else {
        userWiseBook.book.push({ id: req.params.id })
        await userWiseBook.save()
    }
})

router.post('/api/cart', async (req, res) => {
    try {
        let userWiseBook = await UserBook.findOne({ user: req.body.customerId })

        if (userWiseBook !== null) {
            try {
                const bookdata = await Promise.all(
                    userWiseBook?.book.map(async (item, i) => {
                        let bookData = await Book.findById(item.id);
                        return bookData;
                    })
                );
        
                res.send(bookdata)
            } catch (e) {
                console.log(e)
                res.send(e)
            }
        } else {
            res.send([])
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

module.exports = router;