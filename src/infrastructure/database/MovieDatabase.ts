import Database from 'better-sqlite3';
import * as path from 'path';
import { CsvMovieLoader } from '../services/CsvMovieLoader';

export class MovieDatabase {
    private db: Database.Database;

    constructor() {
        this.db = new Database(':memory:');
        this.createTable();
        this.loadInitialData();
    }

    private createTable(): void {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS movies (
                id uuid PRIMARY KEY,
                year INTEGER NOT NULL,
                title TEXT NOT NULL,
                studios TEXT NOT NULL,
                producers TEXT NOT NULL,
                winner BOOLEAN NOT NULL DEFAULT 0)`;

        this.db.exec(createTableSQL);
    }

    private loadInitialData(): void {
        try {
            const csvPath = path.join(__dirname, '../data/Movielist.csv');
            const movies = CsvMovieLoader.loadMoviesFromCsv(csvPath);

            const stmt = this.db.prepare(`
                INSERT INTO movies (id, year, title, studios, producers, winner)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            movies.forEach(movie => {
                stmt.run(movie.id, movie.year, movie.title, movie.studios, movie.producers, movie.winner ? 1 : 0);
            });

            console.log(`Loaded ${movies.length} movies from CSV`);
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    getDatabase(): Database.Database {
        return this.db;
    }

    close(): void {
        this.db.close();
    }
}