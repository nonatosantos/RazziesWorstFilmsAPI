import { Response } from 'express';
import { GetProducerIntervalsUseCase } from '../../application/useCases/getProducerIntervals/GetProducerIntervalsUseCase';

export class MoviesController {
    constructor(
        private getProducerIntervalsUseCase: GetProducerIntervalsUseCase
    ) { }

    async getProducerIntervals(res: Response): Promise<void> {
        try {
            const response = this.getProducerIntervalsUseCase.execute();
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
