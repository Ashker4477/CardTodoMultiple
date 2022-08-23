const express = require('express');
const Card = require('../Model/CardModel');
const {
    saveCard,
    getAllCards,
    getCardById,
    editCardById,
} = require('./CardRouter.controller');

const CardRouter = express.Router();

CardRouter.post('/', saveCard);

CardRouter.get('/', getAllCards);

CardRouter.get('/:id', getCardById);

CardRouter.put('/:id', editCardById);

module.exports = CardRouter;
