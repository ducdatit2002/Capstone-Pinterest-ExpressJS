import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import slugify from "slugify";

export const helper = {
    responses: (res, code, data, links) => {
        let message = "processed successfully";
        if (`${code}`.startsWith("4")) message = "fail";
        if (`${code}`.startsWith("5")) message = "error";
        if (!links) links = { docs: "https://doc.com/api" };

        const result = {
            message,
            data,
            links,
        };

        res.status(code).json(result);
    },

    hashedPassword: async (password) => {
        const salt = await bcryptjs.genSalt(10);

        return await bcryptjs.hash(password, salt);
    },

    checkPassword: async (userInputPassword, hashedPasswordFromDatabase) => {
        return await bcryptjs.compare(userInputPassword, hashedPasswordFromDatabase);
    },

    createJwt: (payload, expiresIn) => {
        const secret = process.env.SECRET;

        if (!secret) return undefined;

        const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

        return token;
    },

    verifyJwt: (accessToken) => {
        const secret = process.env.SECRET;

        const decodedToken = jwt.verify(accessToken, secret);

        return decodedToken;
    },

    decodeJwt: (accessToken) => {
        return jwt.decode(accessToken);
    },

    saveImage: (file) => {
        if (!fs.existsSync(path.join(process.cwd(), "public", "img"))) fs.mkdirSync(imgUploadDir, { recursive: true });

        const fileName = new Date().getTime() + "_" + slugify(file.originalname);

        const filePath = path.join("public/img", fileName);

        fs.writeFile(filePath, file.buffer, "binary", (err) => {
            if (err) console.log("ERROR", err);
            console.log("Save Image Successfully");
        });

        return fileName;
    },
};