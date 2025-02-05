const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');


// Create a Model
router.post('/', async(req, res) => {

    try {
        const rental = new Rental(req.body);
        await rental.save();
        res.status(200).json({ message: 'Successfully Rented Model' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Show Rentals
router.get('/', async(req, res) => {

    try {
        const rentals = await Rental.find();
        res.status(200).json(rentals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Update Rentals
router.put('/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const updatedRental = await Rental.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRental) {
            return res.status(400).json({ message: 'Rental Does Not Exist' });
        }

        res.status(200).json({ message: 'Successfully Updated Rental' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Delete Rental
router.delete('/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const deletedRental = await Rental.findByIdAndDelete(id);

        if (!deletedRental) {
            return res.status(400).json({ message: 'Rental Does Not Exist' });
        }

        res.status(200).json({ message: 'Successfully Deleted Rental' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;