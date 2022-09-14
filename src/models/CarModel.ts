import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carSchema = new Schema<ICar>({
  buyValue: Number,
  color: String,
  year: Number,
  model: String,
  status: Boolean,
  doorsQty: Number,
  seatsQty: Number,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carSchema)) {
    super(model);
  }
}
