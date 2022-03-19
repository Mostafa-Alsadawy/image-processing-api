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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_1 = __importDefault(require("../../models/image"));
const sharp_1 = __importDefault(require("sharp"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test the api image processing', () => {
    // test data
    const image = new image_1.default('fjord', 300, 300);
    // this to checkif processed image is already exits.
    let isImageExists = false;
    beforeAll(() => {
        if (image.isImageInDest) {
            isImageExists = true;
        }
    });
    it('test api with bad request ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api`);
        expect(response.status).toBe(400);
    }));
    it('check the status code for image processing via api', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api?fileName=${image.name}&width=${image.toWidth}&height=${image.toHeight}`);
        expect(response.status).toBe(200);
    }));
    it('check image processing via api', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api?fileName=${image.name}&width=${image.toWidth}&height=${image.toHeight}`);
        const imgInfo = yield (0, sharp_1.default)(response.body).metadata();
        expect(imgInfo.width == image.toWidth && imgInfo.height == image.toHeight).toBeTruthy();
    }));
    afterAll(() => {
        if (!isImageExists) {
            fs_1.default.unlinkSync(path_1.default.join(image_1.default.ImageDestenationFolderPath, 'fjord-300-300.jpg'));
        }
    });
});
