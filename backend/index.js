const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
require("./config/dbConfig");

dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

app.listen(process.env.PORT, () => {
    console.log(`App is running on PORT ${process.env.PORT}`)
})