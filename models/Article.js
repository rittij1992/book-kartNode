const mongoose = require('mongoose');

const ArtcleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', ArtcleSchema);