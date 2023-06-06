const mongoose = require('mongoose')

const userBookSchema = new mongoose.Schema({
    user: String,
    book: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
});

module.exports = mongoose.model('userBooks', userBookSchema);