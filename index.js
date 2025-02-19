import cookieParser from "cookie-parser";
import "dotenv/config";
import "./database/connectiondb.js"
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js"
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

const whiteList = [process.env.ORIGIN1]

app.use(cors({
    origin: function(origin, callback){
        console.log("😐😐😐 => ", origin)
        if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
        }
        return callback("CORS error: "+ origin + "Unauthorized");
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/", redirectRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥🔥 http://localhost:${PORT} 🔥🔥`));