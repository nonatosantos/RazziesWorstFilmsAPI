import { Router } from 'express';
import { ProducersController } from '../controllers/ProducersController';

export function createProducersRoutes(producersController: ProducersController): Router {
    const router = Router();

    router.get('/producers/intervals', (_, res) => producersController.getIntervals(res));
    return router;
}