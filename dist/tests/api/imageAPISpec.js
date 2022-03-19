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
const request = (0, supertest_1.default)(index_1.default);
describe('Test the api image processing', () => {
    const ImageName = 'fjord';
    const width = 300;
    const height = 300;
    let isImageExists = false;
    beforeAll(() => {
        if (fs_1.default
            .readdirSync(image_1.default.IMAGES_DESTINATION_FOLDER)
            .includes(ImageName)) {
            isImageExists = true;
        }
    });
    it('gets api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api`);
        expect(response.status).toBe(200);
    }));
    it('gets image endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api?fileName=${ImageName}&width=${width}&height=${height}`);
        expect(response.status).toBe(200);
    }));
    afterAll(() => {
        if (!isImageExists) {
            fs_1.default.unlinkSync(path_1.default.join(image_1.default.ImageDestenationFolderPath, 'fjord-300-300.jpg'));
        }
    });
});
