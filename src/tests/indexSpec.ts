// This code from Udacty course Backend Development with Node.js lesson 4.
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test  endpoint responses', () => {
    it('gets index endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('gets not exists route endpoint', async () => {
        const response = await request.get('/randome');
        expect(response.status).toBe(404);
    });
});
