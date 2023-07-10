import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import routers
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// middlewares
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root route

app.get('/', (req: Request, res: Response) => {
  res.send('working successfully');
});
// application routes

app.use('/api/v1/users', UserRoutes);

// global api error handler
// app.get('/test', async (req: Request, res: Response) => {
// console.log(y);
// Promise.reject(new Error('unhandled'));
//   throw new Error('testin error');
// });
// global api error handler
// app.get('*', (req: Request, res: Response) => {
//   throw new ApiError(404, 'No routes found');
// });
app.use(globalErrorHandler);

export default app;
