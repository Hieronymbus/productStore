import express, { request, response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());//alows us to accept JSON data in the request.body
   
app.use("/api/products", productRoutes)

app.listen(PORT, ()=> {
    connectDB();
    console.log("server started at http://localhost:" + PORT)
})


