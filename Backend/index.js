import express  from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";
import moodRoutes from "./routes/mood.route.js";
import taksRoutes from "./routes/taskRoutes.route.js";
import eventRoutes from "./routes/eventRoutes.route.js"
import ClockRoutes from "./routes/Clock.route.js";
import imageUploadRoute from './routes/imageUpload.route.js';
import geminiRoutes from "./routes/openrouter.route.js"


dotenv.config();
const app = express();
const PORT=  process.env.PORT || 5000;

app.use(cors({ origin: 'focustrail-frontends.up.railway.app', credentials: true })); // Adjust the origin as needed
app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming cookies

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth",authRoutes)
app.use("/api/auth",moodRoutes)
app.use("/api/auth",taksRoutes)
app.use('/api/auth', eventRoutes);
app.use('/api/auth',ClockRoutes);
app.use("/api/auth", imageUploadRoute);  
app.use('/api', geminiRoutes);

app.listen(PORT, () => {
    connectDB()
  console.log(`Server is running on port ${PORT}`);
});