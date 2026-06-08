import { populate } from "dotenv";
import Hotel from "../models/Hotel.js"
import { v2 as cloudinary } from "cloudinary"

//API to create a new room for a hotel
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId })

        if (!hotel) return res.json({ success: false, message: "No Hotel Found" });

        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        //wait for all uploads to complete
        const images = await Promise.all(uploadImages)

        await roomType.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })

        res.json({ success: true, message: "Room Cretaed Successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//API to get all Rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 })
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API to get all Rooms for a specific Hotel
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await hotel.findOne({ owner: req.auth.userId })
        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
        res.json({ success: true, rooms })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API to toggle availability of a room 
export const toggleRoomAvilability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.json({ success: true, message: "Room Availability Updated" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}