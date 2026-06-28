import transporter from "../config/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Function to check room availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });

        return bookings.length === 0;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

// API to check room availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        const isAvailable = await checkAvailability({
            room,
            checkInDate,
            checkOutDate,
        });

        res.json({
            success: true,
            isAvailable,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// API to create booking
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({
            room,
            checkInDate,
            checkOutDate,
        });

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available",
            });
        }

        // Get room details
        const roomData = await Room.findById(room).populate("hotel");

        if (!roomData) {
            return res.json({
                success: false,
                message: "Room not found",
            });
        }

        // Calculate total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const totalPrice = roomData.pricePerNight * nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html: `
                <h2>Your Booking Details</h2>
                <p>Dear ${req.user.username},</p>

                <p>Thank you for your booking!</p>

                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Check In:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Check Out:</strong> ${booking.checkOutDate.toDateString()}</li>
                    <li><strong>Total Amount:</strong> ${process.env.CURRENCY || "$"} ${booking.totalPrice}</li>
                </ul>

                <p>We look forward to welcoming you.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Booking created successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// API to get user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;

        const bookings = await Booking.find({ user })
            .populate("room hotel")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings,
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// API to get hotel owner's bookings
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({
            owner: req.auth.userId,
        });

        if (!hotel) {
            return res.json({
                success: false,
                message: "No hotel found",
            });
        }

        const bookings = await Booking.find({
            hotel: hotel._id,
        })
            .populate("room hotel user")
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;

        const totalRevenue = bookings.reduce(
            (acc, booking) => acc + booking.totalPrice,
            0
        );

        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings,
            },
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};