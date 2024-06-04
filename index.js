import authRoutes from "./src/routes/auth.js";
import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

dotenv.config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the start")
});

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  )
  .catch((err) => console.log(err.message));



