import supertest from 'supertest';
import app from '../../index';
import fs from 'fs';
import path from 'path';
import ImageModel from '../../models/image';

const request = supertest(app);
describe('Test the api image processing', () => {
    const ImageName = 'fjord';
    const width = 300;
    const height = 300;
    let isImageExists = false;
    beforeAll(() => {
        if (
            fs
                .readdirSync(ImageModel.IMAGES_DESTINATION_FOLDER)
                .includes(ImageName)
        ) {
            isImageExists = true;
        }
    });
    it('gets api endpoint', async () => {
        const response = await request.get(`/api`);
        expect(response.status).toBe(200);
    });
    it('gets image endpoint', async () => {
        const response = await request.get(
            `/api?fileName=${ImageName}&width=${width}&height=${height}`
        );
        expect(response.status).toBe(200);
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
