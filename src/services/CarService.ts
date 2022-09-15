import ICarService from '../interfaces/ICarService';
import zodCar, { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default class CarService implements ICarService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = zodCar.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();

    return cars;
  }

  public async readOne(string: string): Promise<ICar | null> {
    const car = await this._car.readOne(string);

    if (!car) throw new Error('No elements found.');

    return car;
  }

  public async update(string: string, obj: ICar): Promise<ICar | null> {
    await this._car.update(string, obj);

    return null;
  }

  public async delete(string: string): Promise<ICar | null> {
    const deleted = await this._car.delete(string);

    return deleted;
  }
}
