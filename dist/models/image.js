"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// This is a helper class that help any thing according to image.
class ImageModel {
    constructor(name, toWidth, toHeight) {
        this.name = name;
        this.toWidth = toWidth;
        this.toHeight = toHeight;
    }
    get imagePath() {
        return path_1.default.join(__dirname, '../../', ImageModel.IMAGES_SOURCE_FOLDER, this.name + ImageModel.IMAGES_EXTENSTION);
    }
    static get ImageSrcFolderPath() {
        return path_1.default.join(__dirname, '../../', ImageModel.IMAGES_SOURCE_FOLDER);
    }
    static get ImageDestenationFolderPath() {
        return path_1.default.join(__dirname, '../../', ImageModel.IMAGES_DESTINATION_FOLDER);
    }
    // this retuen all images in src floder in array and fetch them
    // only once.
    static get allImages() {
        if (!ImageModel.EXCUTED) {
            try {
                this.images = fs_1.default.readdirSync(ImageModel.ImageSrcFolderPath);
            }
            catch (e) {
                throw new Error(e);
            }
        }
        return this.images;
    }
    get isImageInDest() {
        let result = false;
        try {
            result = fs_1.default
                .readdirSync(ImageModel.IMAGES_DESTINATION_FOLDER)
                .includes(`${this.name}-${this.toWidth}-${this.toHeight}${ImageModel.IMAGES_EXTENSTION}`);
        }
        catch (e) {
            throw new Error(e);
        }
        return result;
    }
    get pathInDestFolder() {
        return path_1.default.join(ImageModel.ImageDestenationFolderPath, this.name +
            '-' +
            this.toWidth +
            '-' +
            this.toHeight +
            ImageModel.IMAGES_EXTENSTION);
    }
}
ImageModel.IMAGES_EXTENSTION = '.jpg';
ImageModel.IMAGES_SOURCE_FOLDER = 'images';
ImageModel.IMAGES_DESTINATION_FOLDER = 'processed_images';
ImageModel.EXCUTED = false; // this for not call all images more than once
exports.default = ImageModel;
