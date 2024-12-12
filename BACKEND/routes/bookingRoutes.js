import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post('/:id', async (req, res) => {
    try
    {
        const {id} = req.params; 
        if (!id) {
            return res.status(400).json({ message: 'Invalid property id' });
        }

        const {user_id, user_name, user_email, user_contact, check_in, check_out, total_price} = req.body;
    
        const existingPropertyBooking = await Booking.find({ property_id: id, check_in: { $lte: check_out }, check_out: { $gte: check_in } });
    
        if(existingPropertyBooking.length > 0)
        {
            return res.status(400).json({ message: 'Sorry this property is already booked for the selected dates' });
        }
    
        const booking = new Booking({ property_id: id, user_id, user_name, user_email, user_contact, check_in, check_out, total_price });
        await booking.save();
        return res.status(201).json({booking, message: 'Booking confirmed'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

export default router;
