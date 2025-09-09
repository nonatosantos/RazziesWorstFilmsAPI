import { MovieRepository } from '../../../domain/repositories/MovieRepository';
import { ProducerInterval } from './ProducerInterval';
import { ProducerIntervalsResponse } from './ProducerIntervalsResponse';

export class GetProducerIntervalsUseCase {
    constructor(private movieRepository: MovieRepository) { }

    execute(): ProducerIntervalsResponse {
        const winners = this.movieRepository.findWinners();

        if (winners.length === 0) {
            return { min: [], max: [] };
        }

        const intervals = this.calculateIntervals(winners);

        if (intervals.length === 0) {
            return { min: [], max: [] };
        }

        return this.findMinMaxIntervals(intervals);
    }

    private calculateIntervals(winners: { year: number; producers: string }[]): ProducerInterval[] {
        const producerYears = new Map<string, Set<number>>();

        for (const winner of winners) {
            const producers = this.extractProducers(winner.producers);

            for (const producer of producers) {
                if (!producerYears.has(producer)) {
                    producerYears.set(producer, new Set<number>());
                }
                producerYears.get(producer)!.add(winner.year);
            }
        }

        const intervals: ProducerInterval[] = [];

        for (const [producer, yearSet] of producerYears) {
            if (yearSet.size < 2) continue;

            const years = Array.from(yearSet).sort((a, b) => a - b);

            for (let i = 1; i < years.length; i++) {
                intervals.push({
                    producer,
                    interval: years[i]! - years[i - 1]!,
                    previousWin: years[i - 1]!,
                    followingWin: years[i]!
                });
            }
        }

        return intervals;
    }

    private extractProducers(producersString: string): string[] {
        return producersString
            .split(/,| and /)
            .map(producer => producer.trim())
            .filter(producer => producer.length > 0);
    }

    private findMinMaxIntervals(intervals: ProducerInterval[]): ProducerIntervalsResponse {
        let minInterval = intervals[0]!.interval;
        let maxInterval = intervals[0]!.interval;

        for (const interval of intervals) {
            if (interval.interval < minInterval) {
                minInterval = interval.interval;
            }
            if (interval.interval > maxInterval) {
                maxInterval = interval.interval;
            }
        }

        const min: ProducerInterval[] = [];
        const max: ProducerInterval[] = [];

        for (const interval of intervals) {
            if (interval.interval === minInterval) {
                min.push(interval);
            }
            if (interval.interval === maxInterval) {
                max.push(interval);
            }
        }

        return { min, max };
    }
}