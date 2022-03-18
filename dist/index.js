"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageAPI_1 = __importDefault(require("./api/imageAPI"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port${port}`);
});
app.use('/api', imageAPI_1.default);
exports.default = app;
