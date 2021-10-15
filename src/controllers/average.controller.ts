import { NextFunction, Request, Response } from 'express';
import averageService from '../services/average.service';

class AverageController{

    public averageService = new averageService();

    public getAverage = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol, lectures } = req.query;
        try {
            const averagePrice: any = await this.averageService.findAverage( symbol, lectures );
            res.status(200).json({ results: averagePrice });
        } catch (error) {
            next(error);
        }

      };

}

export default AverageController;