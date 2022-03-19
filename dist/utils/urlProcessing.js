"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const image_1 = __importDefault(require("../models/image"));
const searchForImage = (imageName) => {
    return fs_1.default.readdirSync(image_1.default.ImageSrcFolderPath).includes(imageName);
};
exports.default = searchForImage;
