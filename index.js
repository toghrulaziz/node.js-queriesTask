const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas", err));



app.get("/search/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: searchTerm, $options: 'i' } },
                { firstname: { $regex: searchTerm, $options: 'i' } },
                { lastname: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


port = 4000;
app.listen(4000, () => {
    console.log(`Server running on port ${port}`);
});