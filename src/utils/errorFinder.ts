import ImageModel from '../models/image';
// this function responsible for finding user errors and return array of error massages.

const errors = (image: ImageModel) => {
    const errorList: string[] = [];
    const images = ImageModel.allImages;
    const isImageExists: boolean = images.includes(
        image.name + ImageModel.IMAGES_EXTENSTION
    );
    const hasWidth: boolean = image.toWidth > 0;
    const hasHeight: boolean = image.toHeight > 0;

    if (!isImageExists) {
        errorList.push('You must choose from exist images');
    }
    if (!hasWidth) {
        errorList.push('The Image must have a width');
    }
    if (!hasHeight) {
        errorList.push('The Image must have a height');
    }
    return errorList;
};

export default errors;
