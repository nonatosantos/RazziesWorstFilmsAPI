import { Router } from 'express';
import { MoviesController } from '../controllers/MoviesController';

export function createMoviesRoutes(moviesController: MoviesController): Router {
    const router = Router();

    router.get('/movies', (_, res) => moviesController.getProducerIntervals(res));
    return router;
}