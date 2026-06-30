import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// Create Room
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;

        // Find hotel of logged-in owner
        const hotel = await Hotel.findOne({
            owner: req.user._id,
        });

        if (!hotel) {
            return res.json({
                success: false,
                message: "No Hotel Found",
            });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });

        const images = await Promise.all(uploadPromises);

        // Create room
        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: Number(pricePerNight),
            amenities: JSON.parse(amenities),
            images,
        });

        res.json({
            success: true,
            message: "Room Created Successfully",
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Available Rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({
            isAvailable: true,
        })
            .populate({
                path: "hotel",
                populate: {
                    path: "owner",
                    select: "image",
                },
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            rooms,
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Get Owner Rooms
export const getOwnerRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({
            owner: req.user._id,
        });

        if (!hotel) {
            return res.json({
                success: false,
                message: "No Hotel Found",
            });
        }

        const rooms = await Room.find({
            hotel: hotel._id,
        }).populate("hotel");

        res.json({
            success: true,
            rooms,
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};


// Toggle Room Availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;

        const room = await Room.findById(roomId);

        if (!room) {
            return res.json({
                success: false,
                message: "Room Not Found",
            });
        }

        room.isAvailable = !room.isAvailable;

        await room.save();

        res.json({
            success: true,
            message: "Room Availability Updated",
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};