import express from "express";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvilability } from "../controllers/roomController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const roomRouter = express.Router()

roomRouter.post('/', upload.array("images", 4), protect, createRoom)
roomRouter.get('/', getRooms)
roomRouter.get('/owner', protect, getOwnerRooms)
roomRouter.post('/toggle-Availability', protect, toggleRoomAvilability)

export default roomRouter;