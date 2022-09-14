import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(string: string): Promise<T | null> {
    return this._model.findOne({ string });
  }

  public async update(_string: string, _obj: T): Promise<T | null> {
    this._model.updateOne();
    return null;
  }

  public async delete(string: string): Promise<T | null> {
    return this._model.remove(string);
  }
}
