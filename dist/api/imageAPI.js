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
const express_1 = __importDefault(require("express"));
const image_1 = __importDefault(require("../models/image"));
const imageProcessing_1 = __importDefault(require("../utils/imageProcessing"));
const errorFinder_1 = __importDefault(require("../utils/errorFinder"));
const router = express_1.default.Router();
//This is the end point for the api and it responsible for handel
//all get requests thats start with /api
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //adding try catch block to not stop the server if unexpected error happened.
    try {
        // parse the request query data
        const imageRequested = new image_1.default(req.query.fileName, parseInt(req.query.width), parseInt(req.query.height));
        // checking for any user errors.
        const errorList = (0, errorFinder_1.default)(imageRequested);
        // if there no errors.
        if (errorList.length === 0) {
            // check if the requested image in the processed image folder.
            if (!imageRequested.isImageInDest) {
                yield (0, imageProcessing_1.default)(imageRequested);
            }
            res.sendFile(imageRequested.pathInDestFolder);
        }
        // if error happened form user , show the errors for him/her.
        else {
            res.status(400).render('index', {
                errors: errorList,
            });
        }
        // if error happen from the server show the user an error message
    }
    catch (e) {
        res.status(500).render('404', {
            massage: 'Sorry, something wrong happened',
        });
    }
}));
exports.default = router;
