import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js"

dotenv.config();

// mongoose.connect("mongodb+srv://aniketkushwaha13579:M3bhEMAZnfMNJ5zS@realstate.kr72kdt.mongodb.net/?retryWrites=true&w=majority&appName=RealState");
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MonogoDb");
})
    .catch((err) => {
        console.log("Mongo db connection Error: " + err);
    });



const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log("Server is running on the port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter);

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

