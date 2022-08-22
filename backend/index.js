const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { default: CardRouter } = require('./Router/CardRouter');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/card', CardRouter);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
