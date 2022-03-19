"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("../../models/image"));
const errorFinder_1 = __importDefault(require("../../utils/errorFinder"));
describe('Test error handling', () => {
    it('return empty array for good request', () => {
        expect((0, errorFinder_1.default)(new image_1.default('fjord', 300, 300))).toEqual([]);
    });
    it('return array with 1 entry for bad request with 1 wrong attribute', () => {
        expect((0, errorFinder_1.default)(new image_1.default('', 300, 300)).length).toEqual(1);
    });
    it('return array with 3 entry for bad request with 3 wrong attribute', () => {
        expect((0, errorFinder_1.default)(new image_1.default('fdgfdg', -1, -2)).length).toEqual(3);
    });
});
