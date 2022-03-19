"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("../models/image"));
// this function responsible for finding user errors and return array of error massages.
const errors = (image) => {
    const errorList = [];
    const images = image_1.default.allImages;
    const isImageExists = images.includes(image.name + image_1.default.IMAGES_EXTENSTION);
    const hasWidth = image.toWidth > 0;
    const hasHeight = image.toHeight > 0;
    if (!isImageExists) {
        errorList.push('You must choose from exist images');
    }
    if (!hasWidth) {
        errorList.push('The Image must have a width');
    }
    if (!hasHeight) {
        errorList.push('The Image must have a height');
    }
    return errorList;
};
exports.default = errors;
