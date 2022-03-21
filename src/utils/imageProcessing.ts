import sharp from 'sharp';
import ImageModel from '../models/image';

const resizeAndSaveToFile = async (image: ImageModel):Promise<void> => {
    try {
        await sharp(image.imagePath)
            .resize(image.toWidth, image.toHeight)
            .toFile(image.pathInDestFolder);
    } catch (err) {
        throw new Error(err as string);
    }
};

export default resizeAndSaveToFile;
