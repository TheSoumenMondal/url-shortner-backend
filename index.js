import express from "express";
import dotenv from "dotenv";
import connectDB from "./connect.js";
import urlRouter from "./routes/ulr.js";
import cors from "cors";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8001;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB connection Done
connectDB("mongodb://127.0.0.1:27017/shorturls");

//Routes

app.use("/url", urlRouter);
app.use("/url/:shortID", urlRouter);

//Listen app on a Port
app.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
});
