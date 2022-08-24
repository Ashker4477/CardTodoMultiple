const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const CardRouter = require('./Router/CardRouter');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
mongoose.connect(
    process.env.MONGODB_URI || `mongodb://localhost:27017/sample`,
    () => console.log(`DB connected`)
);

app.use('/card', CardRouter);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
