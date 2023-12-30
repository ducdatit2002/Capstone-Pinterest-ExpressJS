import { prisma } from "../index.js"; 
import { helper } from "../helpers/helper.js";
import multer, { diskStorage } from "multer";
import fs from "fs";
import path from "path";

export const middleware = {
    errorHandle: (err, req, res, next) => {
        const statusCode = err.status || 500;

        res.status(statusCode).json({
            message: err.message,
            data: null,
            links: {
                docs: "https://doc.com/api",
            },
        });
    },

    protect: async (req, res, next) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken || !accessToken.startsWith("Bearer ")) return helper.responses(res, 400, "Not enough permissions");

            const token = accessToken.split(" ")[1];
            if (!token || token === "null") return helper.responses(res, 400, "Not enough permissions");

            const decodedToken = helper.verifyJwt(token);
            if (!decodedToken) return helper.responses(res, 400, "Not enough permissions");

            const user = await prisma.users.findFirst({
                where: {
                    userId: decodedToken.userId,
                },
            });

            delete user.password;

            req.user = user;

            next();
        } catch (error) {
            if (error.message === "jwt expired") {
                return helper.responses(res, 400, "jwt expired");
            }
        }
    },

    checkLoginRequest: (req, res, next) => {
        if (!req.body.userName) return helper.responses(res, 400, "Invalid username");

        if (!req.body.password) return helper.responses(res, 400, "Invalid password");

        next();
    },

    checkRegisterRequest: (req, res, next) => {
        if (!req.body.userName) return helper.responses(res, 400, "Invalid userName");
        if (!req.body.password) return helper.responses(res, 400, "Invalid password");
        if (!req.body.email) return helper.responses(res, 400, "Invalid email");
        if (!req.body.phoneNumber) return helper.responses(res, 400, "Invalid phone number");
        if (!req.body.fullName) return helper.responses(res, 400, "Invalid fullname");

        next();
    },

    checkCommentRequest: (req, res, next) => {
        if (!req.body.imageId) return helper.responses(res, 400, "Invalid imageId");
        if (!req.body.content) return helper.responses(res, 400, "Invalid content");

        next();
    },

    checkCreateImageRequest: (req, res, next) => {
        if (!req.file) return helper.responses(res, 400, "Invalid file");
        if (req.file.size > 1000000) return helper.responses(res, 400, "File size cannot exceed 1mb");
        if (!req.body.imageName) return helper.responses(res, 400, "Invalid imageName");
        next();
    },

    upload: () => {
        if (!fs.existsSync(path.join(process.cwd(), "public", "img"))) fs.mkdirSync(imgUploadDir, { recursive: true });

        const storage = diskStorage({
            destination: process.cwd() + "/public/img",
            filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname),
        });

        return multer({ storage });
    },

    isLogin: (req, res, next) => {
        const accessToken = req.headers.authorization;

        if (!accessToken || !accessToken.startsWith("Bearer ")) req.isLogin = false;

        const token = accessToken?.split(" ")[1];
        if (token === "null") req.isLogin = false;

        if (token) {
            req.user = helper.decodeJwt(token);

            req.isLogin = true;
        }
        next();
    },
};
