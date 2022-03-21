import resizeAndSaveToFile from "./../../utils/imageProcessing";
import fs from 'fs';
import path from 'path';
import ImageModel from '../../models/image';
import sharp from 'sharp';

const falseImage = new ImageModel("none",350,350);
const image = new ImageModel("fjord",350,350);

describe("Test the image processing function",():void=>{

    let clearTestImage = true;
    beforeAll(():void => {
        if (image.isImageInDest) {
            clearTestImage = false;
        }
    });

    it("resize image with given width and height",async():Promise<void>=>{
        await resizeAndSaveToFile(image)
        const resizedImageInfo = await sharp(image.pathInDestFolder).metadata();
        expect(resizedImageInfo.width == image.toWidth && resizedImageInfo.height == image.toHeight).toBeTrue();
    })

    it("throw an error if image does not exist",async():Promise<void>=>{
        await expectAsync(resizeAndSaveToFile(falseImage)).toBeRejected()
    })

    afterAll(():void => {
        if (clearTestImage) {
            fs.unlinkSync(
                path.join(
                    ImageModel.ImageDestenationFolderPath,
                    'fjord-350-350.jpg'
                )
            );
        }
    });
})
