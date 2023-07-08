import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import routers
import usersRouter from './app/modules/users/users.route';

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

app.use('/api/v1/users', usersRouter);

export default app;
