import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import todoRoute from './routes/todo-route.js'
import userRoute from './routes/user-route.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT || 3300
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error);
        process.exit(1);
    }
};
connectDb();
app.use("/todo",todoRoute);
app.use("/user",userRoute);

app.listen(port,()=>{
    console.log("server is live");
})