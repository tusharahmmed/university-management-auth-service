import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import router
import { ApplicationRoutes } from './app/routes';

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
app.use('/api/v1', ApplicationRoutes);

// not found route
// app.use('*', (req, res) => {
//   throw new ApiError(httpStatus.NOT_FOUND, 'route not found');
// });

// use global error handler
app.use(globalErrorHandler);

export default app;
