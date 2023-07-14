import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import router
import httpStatus from 'http-status';
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

// error handler middlewar
app.use(globalErrorHandler);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: '',
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
