import { connect } from "../db.js";
import { Booking } from "../models/BookingModel.js";
import mongoose from "mongoose";

export const PostBooking = async (req, res) => {
  try {
    await connect();

    const { user, apartment, startDate, endDate, totalPrice,
            advancePayment, people, children, pets } = req.body;

    if (!user || !apartment || !startDate || !endDate || !totalPrice ||
        !advancePayment || !people) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);


    const newBooking = new Booking({
      user,
      apartment,
      startDate: start,
      endDate: end,
      totalPrice,
      advancePayment,
      people,
      children,
      pets,
    });

    await newBooking.save();

    res.status(201).json({ message: "Reservation created successfully!", newBooking });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation." });
  }
};

export const GetSingleBooking = async (req, res) => {
  const { userId } = req.params;
  try {
    await connect();

    const bookings = await Booking.find({ user: userId })
      .populate('apartment')
      .populate('user');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No reservations found for this user' });
    }

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

export const GetAllBookings = async (req, res) => {
  try {
    await connect();

    const bookings = await Booking.find()
      .populate('apartment')
      .populate('user');

 

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

export const DeleteSingleBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    const result = await Booking.findByIdAndDelete(id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (e) {
    console.error('Error deleting the Reservation:', e);
    res.status(500).json({ error: 'Failed to delete the Reservation' });
  }
};

export const UpdateSingleBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await connect();
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (e) {
    console.error('Error updating Reservation:', e);
    res.status(500).json({ error: 'Failed to update Reservation' });
  }
};

export const PostAdminBooking = async (req, res) => {
  try {
    await connect();

    const { apartment, startDate, endDate, totalPrice,
            firstName, lastName, email,
            advancePayment, people, children, pets } = req.body;

    if (!apartment || !startDate || !endDate || !totalPrice ||
        !advancePayment || !people) {
      return res.status(400).json({ error: "Missing required fields. At least 1 Persone"  });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // const overlappingBooking = await Booking.findOne({
    //   apartment,
    //   $or: [
    //     { startDate: { $lt: end }, endDate: { $gt: start } }
    //   ]
    // });

    // if (overlappingBooking) {
    //   return res.status(409).json({ error: "Apartment is already booked for the selected dates." });
    // }

    const newBooking = new Booking({
      apartment,
      startDate: start,
      endDate: end,
      totalPrice,
      firstName,
      lastName,
      email,
      advancePayment,
      people,
      children,
      pets,
    });

    await newBooking.save();

    res.status(201).json({ message: "Reservation created successfully!", newBooking });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation." });
  }
};


export const GetBookedApartment = async (req, res) => {
  try {
    const { apartment } = req.params; // ili req.body ako dolazi iz tela zahteva
    console.log("Apartment ID:", apartment); // Provera šta dolazi kao ID

    // Provera da li je `apartment` validan ObjectId
    if (!apartment || apartment === "undefined") {
      return res.status(400).json({ error: "Invalid Apartment ID" });
    }

    // Provera validnosti ObjectId
    if (!mongoose.Types.ObjectId.isValid(apartment)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    
   
const bookings = await Booking.find({ apartment: apartment });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};