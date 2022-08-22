export const saveCard = async (req, res) => {
    const { title, description, colomn } = req.body;
    if (!title || !description || !colomn) {
        return res.status(400).json({ message: 'Invalid Data' });
    }
    const exist = await card.find({ title, colomn });
    if (exist) {
        return res.status(400).json({ message: 'Data already exists' });
    }
    const newCardData = new card({
        title,
        description,
        colomn,
    });
    const savedData = await newCardData.save();
    return res.status(200).send(savedData);
};
