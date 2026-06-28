import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import hotelRouter from "./routes/hotelRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import roomRouter from "./routes/roomRoute.js"
import bookingRouter from "./routes/bookingRoute.js"

dotenv.config();

connectDB();
connectCloudinary();

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//api for listen clerk webhooks
app.use(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);

app.get('/', (req, res) => {
    res.send("Roomora")
})

app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
});