"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcessing_1 = __importDefault(require("./../../utils/imageProcessing"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_1 = __importDefault(require("../../models/image"));
const sharp_1 = __importDefault(require("sharp"));
const falseImage = new image_1.default("none", 350, 350);
const image = new image_1.default("fjord", 350, 350);
describe("Test the image processing function", () => {
    let clearTestImage = true;
    beforeAll(() => {
        if (image.isImageInDest) {
            clearTestImage = false;
        }
    });
    it("resize image with given width and height", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageProcessing_1.default)(image);
        const resizedImageInfo = yield (0, sharp_1.default)(image.pathInDestFolder).metadata();
        expect(resizedImageInfo.width == image.toWidth && resizedImageInfo.height == image.toHeight).toBeTrue();
    }));
    it("throw an error if image does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessing_1.default)(falseImage)).toBeRejected();
    }));
    afterAll(() => {
        if (clearTestImage) {
            fs_1.default.unlinkSync(path_1.default.join(image_1.default.ImageDestenationFolderPath, 'fjord-350-350.jpg'));
        }
    });
});
