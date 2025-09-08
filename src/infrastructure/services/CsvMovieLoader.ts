import * as fs from 'fs';
import { Movie } from '../../domain/entities/Movie';
import { randomUUID } from 'crypto';

export class CsvMovieLoader {
    static loadMoviesFromCsv(filePath: string): Movie[] {
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        const lines = csvContent.split('\n');

        const dataLines = lines.slice(1).filter(line => line.trim().length > 0);

        return dataLines.map(line => {
            const parts = line.split(';');

            if (parts.length < 4) {
                throw new Error(`Invalid CSV line: ${line}`);
            }

            const [year, title, studios, producers, winner] = parts;

            if (!year || !title || !studios || !producers) {
                throw new Error(`Missing required fields in CSV line: ${line}`);
            }

            return new Movie(
                randomUUID(),
                parseInt(year, 10),
                title,
                studios,
                producers,
                winner === 'yes'
            );
        });
    }
}
