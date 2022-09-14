import { z } from 'zod';
import { IVehicle } from './IVehicle';

const zodCar = z.object({
  doorsQty: z.number().int().positive().gte(2)
    .lte(4),
  seatsQty: z.number().gte(2).lte(7),
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type ICar = z.infer<typeof zodCar> & IVehicle;
export default zodCar;
