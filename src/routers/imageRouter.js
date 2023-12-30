import express from "express";
import { imageController } from "../controllers/imageController.js";
import { middleware } from "../middlewares/middleware.js";
import multer from "multer";

const upload = multer();

const imageRouter = express.Router();

imageRouter.get("/list", middleware.isLogin, imageController.getList);

imageRouter.get("/search", middleware.isLogin, imageController.search);
imageRouter.get("/search-saved", middleware.protect, imageController.searchOfSavedPage);
imageRouter.get("/search-created", middleware.protect, imageController.searchOfCreatedPage);

imageRouter.get("/image-info/:imageId", middleware.isLogin, imageController.getImageInfo);
imageRouter.post("/create", middleware.protect, upload.single("file"), middleware.checkCreateImageRequest, imageController.createImage);

imageRouter.get("/comment/:imageId", imageController.getComment);
imageRouter.post("/comment", middleware.protect, middleware.checkCommentRequest, imageController.createComment);

imageRouter.get("/save/:imageId", middleware.protect, imageController.getSave);
imageRouter.get("/save-and-unsave/:imageId", middleware.protect, imageController.saveAndUnSave);

imageRouter.delete("/delete/:imageId", middleware.protect, imageController.deleteImage);

export default imageRouter;
