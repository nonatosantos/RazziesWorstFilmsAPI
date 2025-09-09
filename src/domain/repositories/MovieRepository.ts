import { Movie } from '../entities/Movie';

export interface MovieRepository {
    save(movie: Movie): void;
    hasData(): boolean;
    findWinners(): { year: number; producers: string }[];
}