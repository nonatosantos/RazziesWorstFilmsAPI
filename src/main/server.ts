import express from 'express';
import cors from 'cors';
import { MovieDatabase } from '../infrastructure/database/MovieDatabase';
import { SqliteMovieRepository } from '../infrastructure/repositories/SqliteMovieRepository';
import { GetProducerIntervalsUseCase } from '../application/useCases/getProducerIntervals/GetProducerIntervalsUseCase';
import { MoviesController } from '../adapters/controllers/MoviesController';
import { createMoviesRoutes } from '../adapters/routes/moviesRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const database = new MovieDatabase();
const movieRepository = new SqliteMovieRepository(database.getDatabase());
const getProducerIntervalsUseCase = new GetProducerIntervalsUseCase(movieRepository);
const moviesController = new MoviesController(getProducerIntervalsUseCase);

app.use('/api', createMoviesRoutes(moviesController));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };

export default app;