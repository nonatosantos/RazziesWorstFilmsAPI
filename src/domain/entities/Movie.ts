export class Movie {
    public readonly id: string;
    public readonly year: number;
    public readonly title: string;
    public readonly studios: string;
    public readonly producers: string;
    public readonly winner: boolean;

    constructor(
        id: string,
        year: number,
        title: string,
        studios: string,
        producers: string,
        winner: boolean = false,

    ) {
        this.id = id;
        this.year = year;
        this.title = title;
        this.studios = studios;
        this.producers = producers;
        this.winner = winner;
    }
}