import express from 'express';

import CarRoute from './routes/CarRoute';

const app = express();
app.use(express.json());

app.use(CarRoute);

export default app;
