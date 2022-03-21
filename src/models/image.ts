import path from 'path';
import fs from 'fs';

// This is a helper class that help any thing according to image.
class ImageModel {
    constructor(
        public name: string,
        public toWidth: number,
        public toHeight: number
    ) {}
    static IMAGES_EXTENSTION = '.jpg';
    static IMAGES_SOURCE_FOLDER = 'images';
    static IMAGES_DESTINATION_FOLDER = 'processed_images';
    static EXCUTED = false; // this for not call all images more than once
    static images: string[];

    get imagePath(): string {
        return path.join(
            __dirname,
            '../../',
            ImageModel.IMAGES_SOURCE_FOLDER,
            this.name + ImageModel.IMAGES_EXTENSTION
        );
    }

    static get ImageSrcFolderPath(): string {
        return path.join(__dirname, '../../', ImageModel.IMAGES_SOURCE_FOLDER);
    }

    static get ImageDestenationFolderPath(): string {
        return path.join(
            __dirname,
            '../../',
            ImageModel.IMAGES_DESTINATION_FOLDER
        );
    }
    // this retuen all images in src floder in array and fetch them
    // only once.
    static get allImages(): string[] {
        if (!ImageModel.EXCUTED) {
            try {
                this.images = fs.readdirSync(ImageModel.ImageSrcFolderPath);
            } catch (e: unknown) {
                throw new Error(e as string);
            }
        }
        return this.images;
    }

    get isImageInDest(): boolean {
        let result = false;
        try {
            result = fs
                .readdirSync(ImageModel.IMAGES_DESTINATION_FOLDER)
                .includes(
                    `${this.name}-${this.toWidth}-${this.toHeight}${ImageModel.IMAGES_EXTENSTION}`
                );
        } catch (e) {
            throw new Error(e as string);
        }
        return result;
    }

    get pathInDestFolder(): string {
        return path.join(
            ImageModel.ImageDestenationFolderPath,
            this.name +
                '-' +
                this.toWidth +
                '-' +
                this.toHeight +
                ImageModel.IMAGES_EXTENSTION
        );
    }
}

export default ImageModel;
