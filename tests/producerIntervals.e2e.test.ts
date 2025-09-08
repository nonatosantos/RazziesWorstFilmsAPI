import request from 'supertest';
import { app } from '../src/main/server';

describe('Producer Intervals E2E Tests', () => {
    it('should return producer intervals with correct structure', async () => {
        const response = await request(app)
            .get('/api/producers/intervals')
            .expect(200);

        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');
        expect(Array.isArray(response.body.min)).toBe(true);
        expect(Array.isArray(response.body.max)).toBe(true);
    });

    it('should return intervals with correct properties', async () => {
        const response = await request(app)
            .get('/api/producers/intervals')
            .expect(200);

        if (response.body.min.length > 0) {
            const minInterval = response.body.min[0];
            expect(minInterval).toHaveProperty('producer');
            expect(minInterval).toHaveProperty('interval');
            expect(minInterval).toHaveProperty('previousWin');
            expect(minInterval).toHaveProperty('followingWin');
            expect(typeof minInterval.producer).toBe('string');
            expect(typeof minInterval.interval).toBe('number');
            expect(typeof minInterval.previousWin).toBe('number');
            expect(typeof minInterval.followingWin).toBe('number');
        }

        if (response.body.max.length > 0) {
            const maxInterval = response.body.max[0];
            expect(maxInterval).toHaveProperty('producer');
            expect(maxInterval).toHaveProperty('interval');
            expect(maxInterval).toHaveProperty('previousWin');
            expect(maxInterval).toHaveProperty('followingWin');
            expect(typeof maxInterval.producer).toBe('string');
            expect(typeof maxInterval.interval).toBe('number');
            expect(typeof maxInterval.previousWin).toBe('number');
            expect(typeof maxInterval.followingWin).toBe('number');
        }
    });

    it('should return min interval less than or equal to max interval', async () => {
        await request(app)
            .get('/api/producers/intervals')
            .expect(200)
    });

    it('should have followingWin greater than previousWin', async () => {
        const response = await request(app)
            .get('/api/producers/intervals')
            .expect(200);

        [...response.body.min, ...response.body.max].forEach(interval => {
            expect(interval.followingWin).toBeGreaterThan(interval.previousWin);
            expect(interval.interval).toBe(interval.followingWin - interval.previousWin);
        });
    });
})
