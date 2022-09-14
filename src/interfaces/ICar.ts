import { z } from 'zod';
import { IVehicle } from './IVehicle';

const zodCar = z.object({
  doorsQty: z.number().int().positive().gte(2)
    .lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

export type ICar = z.infer<typeof zodCar> & IVehicle;
