import { helper } from "../helpers/helper.js";
import { userService } from "../services/userService.js";

export const userController = {
    register: async (req, res, next) => {
        try {
            const { userName, fullName, password, email, phoneNumber } = req.body;

            const dataRes = await userService.register({ userName, fullName, password, email, phoneNumber });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { userName, password } = req.body;

            const dataRes = await userService.login({ userName, password });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    getUserInfo: async (req, res, next) => {
        try {
            const dataRes = await userService.getUserInfo(req.user);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const userId = req.query.userId;

            const dataRes = await userService.deleteUser(userId);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    getImagesCreated: async (req, res, next) => {
        try {
            const dataRes = await userService.getImagesCreated(req.user);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    getImagesSaved: async (req, res, next) => {
        try {
            const dataRes = await userService.getImagesSaved(req.user);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const dataRes = await userService.updateUser(req.user, req.body);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },
};