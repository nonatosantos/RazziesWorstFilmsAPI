import { Movie } from '../entities/Movie';

export interface ProducerWin {
    producer: string;
    year: number;
}

export interface MovieRepository {
    save(movie: Movie): void;
    findAll(): Movie[];
    findWinnersByProducer(): ProducerWin[];
}