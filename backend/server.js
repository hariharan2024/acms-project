import express from "express";
import lrouter from "./routes/auth.js";
import frouter from "./routes/food.js";
import crouter from "./routes/cust.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

// Endpoint to handle file uploads
app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
    console.log(file.filename);
});

// Modified endpoint to handle adding food with form data


app.use("/api", lrouter);
app.use("/api", frouter);
app.use("/api", crouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
