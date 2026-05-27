import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"

dotenv.config()
connectDB()

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//api for listen clerk webhooks
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.get('/', (req, res) => {
    res.send("Roomora")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`)
})