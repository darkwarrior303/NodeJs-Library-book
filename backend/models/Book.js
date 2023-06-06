const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    price: String,
    author: String,
    userId: String,
    content: String
})

module.exports = mongoose.model('books',bookSchema)