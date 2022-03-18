import express from 'express';
import ImageModel from '../models/image';
import resize from '../utils/imageProcessing';
import fs from 'fs';
const router = express.Router();

router.get('/', (req, res) => {
    const fileName = req.query.fileName as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    console.log(
        fs.readdirSync(ImageModel.ImageSrcFolderPath).includes(fileName)
    );
    if (width && height) {
        resize(new ImageModel(fileName as string, width, height));
        res.send('worked');
    } else {
        res.send('not working');
    }
});

export default router;
