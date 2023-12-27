import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import compression from "compression";
import routers from "./routers/index.js";
import { PrismaClient } from "@prisma/client";


const app = express();

// Danh sách các đường dẫn được cho phép truy cập
const allowedOrigins = ["https://l9-learning-vulebaolong.netlify.app", "https://l9-learning-nguyenthihuynhnhi.netlify.app"];

const corsOptions = {
    origin: function (origin, callback) {
        // Kiểm tra xem origin có trong danh sách allowedOrigins hay không
        if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Cho phép truy cập
        } else {
            callback(new Error("Không cho phép truy cập từ nguồn này")); // Từ chối truy cập
        }
    },
};

// app.use(cors(corsOptions));
app.use(cors());

//  ===============MIDLEWARAE =========================
// nén (compress) các tài nguyên HTTP trước khi gửi từ máy chủ (server) tới trình duyệt (browser)
app.use(compression());

// express.json(): body => JSON
app.use(express.json());
app.use(express.static("."));

//  ===============MIDLEWARAE =========================

export const prisma = new PrismaClient();

app.use("/api/v1", routers);

const port = 6969;
const server = app.listen(port, async () => {
    console.log(`Listening port http://localhost:${port} ...`);
});


