const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDB = require("./config/database")
const { errorHandler } = require("./utils/errorHandler")
const cookieParser = require("cookie-parser")

// Connect to database
const app = express()

// Body parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello from campusCove");
})


// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);


// Add cookie parser
app.use(cookieParser())

// Mount routers
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/hostel-rooms", require("./routes/hostelRoomRoutes"))
app.use("/api/mess", require("./routes/messRoutes"))
app.use("/api/gym", require("./routes/gymRoutes"))
app.use("/api/student", require("./routes/studentRoutes"))
app.use("/api/owner", require("./routes/ownerRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/bookings", require("./routes/bookingRoutes"))

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

// Connect to database before starting server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Database connection failed:", error)
        process.exit(1)
    })

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`)
    // Close server & exit process
    process.exit(1)
})

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    process.exit(1)
})