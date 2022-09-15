import { Request, Response } from 'express';
import ICarService from '../interfaces/ICarService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: ICarService<ICar>) {}

  public async create(request: Request, response: Response<ICar>) {
    try {
      if (request.body.length < 1) return response.status(400).end();

      const { buyValue, color, year, status, model, seatsQty, doorsQty } = request.body;

      const car = { buyValue, color, year, status, model, seatsQty, doorsQty };

      const results = await this._service.create(car);

      return response.status(201).json(results);
    } catch (error) {
      return response.status(400).end();
    }
  }

  public async read(_request: Request, response: Response<ICar[]>) {
    const allCars = await this._service.read();

    return response.status(200).json(allCars);
  }
}
