import { MovieRepository } from '../../../domain/repositories/MovieRepository';
import { CsvMovieLoader } from '../../../infrastructure/services/CsvMovieLoader';
import { AppConfig } from '../../../main/config';

export class InitializeDataUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(): Promise<void> {
        try {
            const existingMovies = this.movieRepository.findAll();
            if (existingMovies.length > 0) {
                console.log('Database already initialized with', existingMovies.length, 'movies');
                return;
            }

            const filePath = AppConfig.data.csvPath;
            console.log('Loading movies from CSV:', filePath);

            const movies = CsvMovieLoader.loadMoviesFromCsv(filePath);

            if (movies.length === 0) {
                throw new Error('No movies loaded from CSV file');
            }

            const batchSize = AppConfig.data.batchSize;
            const batches = [];

            for (let i = 0; i < movies.length; i += batchSize) {
                batches.push(movies.slice(i, i + batchSize));
            }

            console.log(`Saving ${movies.length} movies in ${batches.length} batches...`);

            for (const batch of batches) {
                await Promise.all(batch.map(movie => this.movieRepository.save(movie)));
            }

            console.log(`Successfully initialized database with ${movies.length} movies`);

        } catch (error) {
            console.error('Error loading initial data:', error);
            throw new Error(`Failed to initialize database: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}