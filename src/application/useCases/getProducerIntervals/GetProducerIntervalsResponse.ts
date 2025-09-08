export class ProducerIntervalResponse {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;

    constructor(producer: string, interval: number, previousWin: number, followingWin: number) {
        this.producer = producer;
        this.interval = interval;
        this.previousWin = previousWin;
        this.followingWin = followingWin;
    }
}

export class GetProducerIntervalsResponse {
    min: ProducerIntervalResponse[];
    max: ProducerIntervalResponse[];

    constructor(min: ProducerIntervalResponse[], max: ProducerIntervalResponse[]) {
        this.min = min;
        this.max = max;
    }
}