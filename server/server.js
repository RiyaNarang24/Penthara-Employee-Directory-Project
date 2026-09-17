const employeeRoutes = require("./routes/employeeRoutes");
const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
dotenv.config();
connectDB();
const app=express();
const PORT=process.env.PORT||5000;

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://penthara-employee-directory-project.vercel.app",
    ],
  })
);
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.get("/",(req,res)=>{
    res.json({message:"Employee Directory API is running"});
});
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});