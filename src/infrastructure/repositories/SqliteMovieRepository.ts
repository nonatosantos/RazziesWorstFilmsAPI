import Database from 'better-sqlite3';
import { Movie } from '../../domain/entities/Movie';
import { MovieRepository, ProducerWin } from '../../domain/repositories/MovieRepository';

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

    findAll(): Movie[] {
        const stmt = this.db.prepare('SELECT * FROM movies ORDER BY year, title');
        const rows = stmt.all();
        return rows.map(row => this.mapRowToMovie(row));
    }

    findWinnersByProducer(): ProducerWin[] {
        const stmt = this.db.prepare('SELECT year, producers FROM movies WHERE winner = 1');
        const rows = stmt.all();

        const producerWins: ProducerWin[] = [];

        rows.forEach((row: any) => {
            const producers = row.producers.split(',');

            producers.forEach((producerGroup: string) => {
                const individualProducers = producerGroup.split(' and ');

                individualProducers.forEach((producer: string) => {
                    const trimmedProducer = producer.trim();
                    if (trimmedProducer && trimmedProducer.length > 0) {
                        producerWins.push({
                            producer: trimmedProducer,
                            year: row.year
                        });
                    }
                });
            });
        });

        return producerWins.sort((a, b) => {
            if (a.producer === b.producer) {
                return a.year - b.year;
            }
            return a.producer.localeCompare(b.producer);
        });
    }

    private mapRowToMovie(row: any): Movie {
        return new Movie(
            row.id,
            row.year,
            row.title,
            row.studios,
            row.producers,
            Boolean(row.winner)        
        );
    }
}