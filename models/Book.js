const mongoose = require('mongoose');

const BookssSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    writer: {
        type: String,
        required: true
    },
    release: {
        type: String,
        recuired: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookssSchema);