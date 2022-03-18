import sharp from 'sharp';
import ImageModel from '../models/image';

const resizeAndSaveToFile = async (image: ImageModel) => {
    try {
        await sharp(image.imagePath)
            .resize(image.toWidth, image.toHeight)
            .toFile(image.destenationPath);
    } catch (err) {
        console.log(err);
    }
};

export default resizeAndSaveToFile;
