// This code from Udacty course Backend Development with Node.js lesson 4.
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});
