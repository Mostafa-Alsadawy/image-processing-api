import fs from 'fs';
import ImageModel from '../models/image';

const searchForImage = (imageName: string): boolean => {
    return fs.readdirSync(ImageModel.ImageSrcFolderPath).includes(imageName);
};
export default searchForImage;
