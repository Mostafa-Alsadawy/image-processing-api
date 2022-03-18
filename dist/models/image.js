"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class ImageModel {
    constructor(name, toWidth, toHeight) {
        this.name = name;
        this.toWidth = toWidth;
        this.toHeight = toHeight;
        this.IMAGES_SOURCE_FOLDER = 'images';
        this.IMAGES_DESTINATION_FOLDER = 'processed_images';
    }
    get imagePath() {
        return path_1.default.join(__dirname, this.IMAGES_SOURCE_FOLDER, this.name);
    }
    get destenationPath() {
        return path_1.default.join(__dirname, this.IMAGES_DESTINATION_FOLDER, this.name);
    }
}
exports.default = ImageModel;
