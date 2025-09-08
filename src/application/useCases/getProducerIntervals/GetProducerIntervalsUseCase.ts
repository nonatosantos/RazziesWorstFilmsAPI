import { MovieRepository } from '../../../domain/repositories/MovieRepository';
import { GetProducerIntervalsResponse, ProducerIntervalResponse } from './GetProducerIntervalsResponse';

interface ProducerInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export class GetProducerIntervalsUseCase {
    constructor(private movieRepository: MovieRepository) { }

    execute(): GetProducerIntervalsResponse {
        const producerWins = this.movieRepository.findWinnersByProducer();
        const intervals = this.calculateIntervals(producerWins);

        if (intervals.length === 0) {
            return new GetProducerIntervalsResponse([], []);
        }

        const { minIntervals, maxIntervals } = this.findMinMaxIntervals(intervals);

        return new GetProducerIntervalsResponse(minIntervals, maxIntervals);
    }

    private calculateIntervals(producerWins: any[]): ProducerInterval[] {
        const producerYears = this.groupYearsByProducer(producerWins);
        return this.generateIntervalsFromYears(producerYears);
    }

    private groupYearsByProducer(producerWins: any[]): { [key: string]: number[] } {
        const producerYears: { [key: string]: Set<number> } = {};

        producerWins.forEach(win => {
            if (!producerYears[win.producer]) {
                producerYears[win.producer] = new Set<number>();
            }

            const yearSet = producerYears[win.producer];
            if (yearSet) {
                yearSet.add(win.year);
            }
        });

        const result: { [key: string]: number[] } = {};
        Object.entries(producerYears).forEach(([producer, yearSet]) => {
            result[producer] = Array.from(yearSet);
        });

        return result;
    }

    private generateIntervalsFromYears(producerYears: { [key: string]: number[] }): ProducerInterval[] {
        const intervals: ProducerInterval[] = [];

        Object.entries(producerYears).forEach(([producer, years]) => {
            if (this.hasMultipleWins(years)) {
                const sortedYears = this.sortYears(years);
                const producerIntervals = this.createIntervalsForProducer(producer, sortedYears);
                intervals.push(...producerIntervals);
            }
        });

        return intervals;
    }

    private hasMultipleWins(years: number[]): boolean {
        return years && years.length >= 2;
    }

    private sortYears(years: number[]): number[] {
        return years.sort((a, b) => a - b);
    }

    private createIntervalsForProducer(producer: string, sortedYears: number[]): ProducerInterval[] {
        const intervals: ProducerInterval[] = [];

        for (let i = 1; i < sortedYears.length; i++) {
            const interval = this.createInterval(producer, sortedYears, i);
            if (interval) {
                intervals.push(interval);
            }
        }

        return intervals;
    }

    private createInterval(producer: string, years: number[], index: number): ProducerInterval | null {
        const previousYear = years[index - 1];
        const currentYear = years[index];

        if (previousYear !== undefined && currentYear !== undefined) {
            return {
                producer,
                interval: currentYear - previousYear,
                previousWin: previousYear,
                followingWin: currentYear
            };
        }

        return null;
    }

    private findMinMaxIntervals(intervals: ProducerInterval[]): { minIntervals: ProducerIntervalResponse[], maxIntervals: ProducerIntervalResponse[] } {
        const minInterval = Math.min(...intervals.map(i => i.interval));
        const maxInterval = Math.max(...intervals.map(i => i.interval));

        const minIntervals = this.filterAndMapIntervals(intervals, minInterval);
        const maxIntervals = this.filterAndMapIntervals(intervals, maxInterval);

        return { minIntervals, maxIntervals };
    }

    private filterAndMapIntervals(intervals: ProducerInterval[], targetInterval: number): ProducerIntervalResponse[] {
        return intervals
            .filter(i => i.interval === targetInterval)
            .map(i => new ProducerIntervalResponse(i.producer, i.interval, i.previousWin, i.followingWin));
    }
}