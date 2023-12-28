import express from "express";
import { userController } from "../controllers/userController.js";
import { middleware } from "../middlewares/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", middleware.checkRegisterRequest, userController.register);
userRouter.post("/login", middleware.checkLoginRequest, userController.login);

userRouter.get("/", middleware.protect, userController.getUserInfo);
userRouter.get("/images-created", middleware.protect, userController.getImagesCreated);
userRouter.get("/images-saved", middleware.protect, userController.getImagesSaved);

userRouter.put("/update", middleware.protect, userController.updateUser);

export default userRouter;