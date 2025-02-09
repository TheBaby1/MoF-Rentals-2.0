const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a User
router.post('/', async(req, res) => {

    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ message: 'Successfully Created User' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Show All Users 
router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Update Users by ID
router.put('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ mesage: 'User Does Not Exist.' });
        }

        res.status(200).json({ message: 'Sucessfully Updated User' });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
})

// Delete User by ID
router.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(400).json({ message: 'User Does Not Exist' });
        }

        res.status(200).json({ message: 'Succesfully Deleted User' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;