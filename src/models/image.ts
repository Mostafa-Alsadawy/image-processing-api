import path from 'path';

class ImageModel {
    constructor(
        public name: string,
        public toWidth: number,
        public toHeight: number
    ) {}
    static IMAGES_EXTENSTION = '.jpg';
    static IMAGES_SOURCE_FOLDER = 'images';
    static IMAGES_DESTINATION_FOLDER = 'processed_images';

    get imagePath() {
        return path.join(
            __dirname,
            '../../',
            ImageModel.IMAGES_SOURCE_FOLDER,
            this.name + ImageModel.IMAGES_EXTENSTION
        );
    }

    get destenationPath() {
        return path.join(
            __dirname,
            '../../',
            ImageModel.IMAGES_DESTINATION_FOLDER,
            this.name +
                '-' +
                this.toWidth +
                '-' +
                this.toHeight +
                ImageModel.IMAGES_EXTENSTION
        );
    }

    static get ImageSrcFolderPath() {
        return path.join(__dirname, '../../', ImageModel.IMAGES_SOURCE_FOLDER);
    }

    static get ImageDestenationFolderPath() {
        return path.join(
            __dirname,
            '../../',
            ImageModel.IMAGES_DESTINATION_FOLDER
        );
    }
}

export default ImageModel;
