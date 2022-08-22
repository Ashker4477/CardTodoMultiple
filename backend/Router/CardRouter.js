const express = require('express');
const card = require('../Model/CardModel');
const { saveCard } = require('./CardRouter.controller');

const CardRouter = express.Router();

CardRouter.post('/', saveCard);

export default CardRouter;
