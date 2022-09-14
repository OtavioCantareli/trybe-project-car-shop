import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';

const CarRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

CarRoute.post('/cars', (request, response) => carController.create(request, response));

export default CarRoute;
