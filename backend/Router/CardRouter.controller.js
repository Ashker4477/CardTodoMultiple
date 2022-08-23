const Card = require('../Model/CardModel');

const saveCard = async (req, res) => {
    const { title, description, colomn } = req.body;
    if (!title || !description || !colomn) {
        return res.status(400).json({ message: 'Invalid Data' });
    }
    const exist = await Card.findOne({ title });
    if (exist) {
        return res.status(400).json({ message: 'Data already exists' });
    }
    const newCardData = new Card(
        {
            title,
            description,
            colomn,
        },
        { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    const savedData = await newCardData.save();
    return res.status(201).send(savedData);
};

const getAllCards = async (req, res) => {
    const allData = await Card.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
    return res.status(200).send(allData);
};

const getCardById = async (req, res) => {
    const id = req.params.id;
    if (id.length < 12) {
        return res.status(404).json({ message: 'Card Not found' });
    }
    const findData = await Card.findById(id);
    if (!findData) {
        return res.status(404).json({ message: 'Card Not found' });
    }
    return res.status(200).send(findData);
};

const editCardById = async (req, res) => {
    const id = req.params.id;
    if (id.length < 12) {
        return res.status(404).json({ message: 'Card Not found' });
    }
    const { title, description, colomn } = req.body;
    if (!title || !description || !colomn) {
        return res.status(400).json({ message: 'Invalid Data' });
    }
    const findData = await Card.findById(id);
    if (!findData) {
        return res.status(404).json({ message: 'Card Not found' });
    }
    findData.title = title;
    findData.description = description;
    findData.colomn = colomn;
    const editedCard = findData.save();
    return res.status(200).send(editedCard);
};

// const saveCardData = async (title, description, colomn) => {
//     const newCardData = new Card({
//         title,
//         description,
//         colomn,
//     });
//     const savedData = await newCardData.save();
//     return savedData;
// };

// const existError = async (title) => {
//     const exist = await Card.find({ title });
//     if (exist) {
//         return res.status(400).json({ message: 'Data already exists' });
//     }
// };

// const ValidateCardData = (title, description, colomn) => {
//     if (!title || !description || !colomn) {
//         return res.status(400).json({ message: 'Invalid Data' });
//     }
// };

module.exports = {
    saveCard,
    getAllCards,
    getCardById,
    editCardById,
};
