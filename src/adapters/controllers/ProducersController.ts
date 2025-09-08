import { Response } from 'express';
import { GetProducerIntervalsUseCase } from '../../application/useCases/getProducerIntervals/GetProducerIntervalsUseCase';

export class ProducersController {
    constructor(
        private getProducerIntervalsUseCase: GetProducerIntervalsUseCase
    ) { }

    async getIntervals(res: Response): Promise<void> {
        try {
            const response = this.getProducerIntervalsUseCase.execute();
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
