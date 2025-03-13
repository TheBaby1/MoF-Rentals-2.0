const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'rentals',
        format: async () => 'png', // Adjust format if needed
        public_id: (req, file) => file.originalname,
    }
});

// Initialize Multer
const upload = multer({ storage: storage });


// Create a Model
router.post('/', upload.single('image'), async(req, res) => {

    try {
        const rentalData = req.body;
        if (req.file) {
            rentalData.imageUrl = req.file.path || req.file.secure_url;
        }

        const rental = new Rental(rentalData);
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