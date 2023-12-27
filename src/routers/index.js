import express from "express";
import userRouter from "./userRouter.js";
import { middleware } from "../middlewares/middleware.js";
import imageRouter from "./imageRouter.js";

const routers = express.Router();

routers.get("/welcome", (req, res) => res.status(200).json("Welcome Api NODE34_Capstone-express-ORM"));

routers.use("/user", userRouter);
routers.use("/image", imageRouter);

routers.all("*", (req, res, next) => res.status(404).json({ message: `Can't find ${req.originalUrl} on this sever!` }));

routers.use(middleware.errorHandle);

export default routers;