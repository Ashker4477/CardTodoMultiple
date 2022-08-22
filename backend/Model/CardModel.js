const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    colomn: {
        type: String,
        required: true,
    },
});

const card = mongoose.model('Card', cardSchema);
module.exports = card;
