import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/mongoDB.js";
const app = express();
const PORT = process.env.PORT;
// Data-Base Calling
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// api's
app.use("/api/h2/user", userRoute);

// app.use("/", (req, res) => {
//   res.send(`Testing api by Hari`);
// });

app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
