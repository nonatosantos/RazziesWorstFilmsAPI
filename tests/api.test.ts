import request from 'supertest';
import app from '../src/main/server';

describe('Razzies Worst Films API - Integration Tests', () => {
    describe('GET /', () => {
        it('should return API info', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.body).toEqual({
                message: 'Razzies Worst Films API',
                version: '1.0.0'
            });
        });
    });
});