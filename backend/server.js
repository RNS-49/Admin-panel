import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./database/connectTodatabse.js";


const app = express();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);



app.listen(PORT,()=>{
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
})