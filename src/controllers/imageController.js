import fs from "fs";
import { helper } from "../helpers/helper.js";
import { imageService } from "../services/imageService.js";

export const imageController = {
    getList: async (req, res, next) => {
        try {
            const dataReq = {
                isLogin: req.isLogin,
                user: req.user,
            };
            const dataRes = await imageService.getList(dataReq);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    search: async (req, res, next) => {
        try {
            const { searchText } = req.query;

            const isLogin = req.isLogin;

            const dataReq = {
                searchText,
                isLogin,
                user: req.user,
            };

            const dataRes = await imageService.search(dataReq);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    searchOfSavedPage: async (req, res, next) => {
        try {
            const { searchText } = req.query;

            const dataReq = {
                searchText,
                user: req.user,
            };

            const dataRes = await imageService.searchOfSavedPage(dataReq);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    searchOfCreatedPage: async (req, res, next) => {
        try {
            const { searchText } = req.query;

            const dataReq = {
                searchText,
                user: req.user,
            };

            const dataRes = await imageService.searchOfCreatedPage(dataReq);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    getImageInfo: async (req, res, next) => {
        try {
            const { imageId } = req.params;

            const isLogin = req.isLogin;

            const dataRes = await imageService.getImageInfo({ imageId: +imageId, user: req.user, isLogin });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    createComment: async (req, res, next) => {
        try {
            const { imageId, content } = req.body;

            const user = req.user;

            const dataRes = await imageService.createComment({ imageId: +imageId, content, user });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    getComment: async (req, res, next) => {
        try {
            const { imageId } = req.params;

            const dataRes = await imageService.getComment(+imageId);

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    saveAndUnSave: async (req, res, next) => {
        try {
            const { imageId } = req.params;

            const user = req.user;

            const dataRes = await imageService.saveAndUnSave({ imageId: +imageId, user });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    getSave: async (req, res, next) => {
        try {
            const { imageId } = req.params;

            const user = req.user;

            const dataRes = await imageService.getSave({ imageId: +imageId, user });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    deleteImage: async (req, res, next) => {
        try {
            const { imageId } = req.params;

            const user = req.user;

            const dataRes = await imageService.deleteImage({ imageId: +imageId, user });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },

    createImage: async (req, res, next) => {
        try {
            const file = req.file;
            const { imageName } = req.body;
            const user = req.user;

            const dataRes = await imageService.createImage({ file, imageName, user });

            helper.responses(res, 200, dataRes);
        } catch (error) {
            next(error);
        }
    },
};
