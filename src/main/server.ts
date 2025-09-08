import express from 'express';
import cors from 'cors';
import { MovieDatabase } from '../infrastructure/database/MovieDatabase';
import { SqliteMovieRepository } from '../infrastructure/repositories/SqliteMovieRepository';
import { GetProducerIntervalsUseCase } from '../application/useCases/getProducerIntervals/GetProducerIntervalsUseCase';
import { InitializeDataUseCase } from '../application/useCases/initializeData/InitializeDataUseCase';
import { MoviesController } from '../adapters/controllers/MoviesController';
import { createMoviesRoutes } from '../adapters/routes/moviesRoutes';
import { AppConfig } from './config';

const app = express();

app.use(cors());
app.use(express.json());

const database = new MovieDatabase();
const movieRepository = new SqliteMovieRepository(database.getDatabase());

const initializeDataUseCase = new InitializeDataUseCase(movieRepository);
const getProducerIntervalsUseCase = new GetProducerIntervalsUseCase(movieRepository);

const moviesController = new MoviesController(getProducerIntervalsUseCase);

app.use('/api', createMoviesRoutes(moviesController));

async function initializeApplication(): Promise<void> {
  try {
    console.log('Initializing application...');
    await initializeDataUseCase.execute();
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    throw error;
  }
}

async function startServer(): Promise<void> {
  try {
    await initializeApplication();

    app.listen(AppConfig.server.port, () => {
      console.log(`Server running on port ${AppConfig.server.port}`);
      console.log(`Environment: ${AppConfig.server.environment}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export { app };