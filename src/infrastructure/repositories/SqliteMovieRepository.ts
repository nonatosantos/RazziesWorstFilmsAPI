import Database from 'better-sqlite3';
import { Movie } from '../../domain/entities/Movie';
import { MovieRepository } from '../../domain/repositories/MovieRepository';

export class SqliteMovieRepository implements MovieRepository {
    private db: Database.Database;

    constructor(database: Database.Database) {
        this.db = database;
    }

    save(movie: Movie): void {
        const stmt = this.db.prepare(`
      INSERT INTO movies (id, year, title, studios, producers, winner)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
        stmt.run(movie.id, movie.year, movie.title, movie.studios, movie.producers, movie.winner ? 1 : 0);
    }

    hasData(): boolean {
        const stmt = this.db.prepare('SELECT COUNT(*) as count FROM movies');
        const result = stmt.get() as { count: number };
        return result.count > 0;
    }

    findWinners(): { year: number; producers: string }[] {
        const stmt = this.db.prepare('SELECT year, producers FROM movies WHERE winner = 1');
        return stmt.all() as { year: number; producers: string }[];
    }
}