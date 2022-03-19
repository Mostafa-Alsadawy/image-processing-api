import supertest from 'supertest';
import app from '../../index';
import fs from 'fs';
import path from 'path';
import ImageModel from '../../models/image';
import sharp from 'sharp';

const request = supertest(app);
describe('Test the api image processing', () => {
    // test data
    const image = new ImageModel('fjord', 300, 300);
    // this to checkif processed image is already exits.
    let isImageExists = false;
    beforeAll(() => {
        if (image.isImageInDest) {
            isImageExists = true;
        }
    });
    it('test api with bad request ', async () => {
        const response = await request.get(`/api`);
        expect(response.status).toBe(400);
    });
    it('check the status code for image processing via api', async () => {
        const response = await request.get(
            `/api?fileName=${image.name}&width=${image.toWidth}&height=${image.toHeight}`
        );
        expect(response.status).toBe(200);
    });
    it('check image processing via api', async () => {
        const response = await request.get(
            `/api?fileName=${image.name}&width=${image.toWidth}&height=${image.toHeight}`
        );
        const imgInfo = await sharp(response.body).metadata();
        expect(
            imgInfo.width == image.toWidth && imgInfo.height == image.toHeight
        ).toBeTruthy();
    });
    afterAll(() => {
        if (!isImageExists) {
            fs.unlinkSync(
                path.join(
                    ImageModel.ImageDestenationFolderPath,
                    'fjord-300-300.jpg'
                )
            );
        }
    });
});
