import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; //deve ser depois do express

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.diretory));
app.use(routes);

// routes.get('/', (request, response) => {
//   console.log('test')
//   return response.json({ message: 'Hello World' }).status(200);
// });

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log(' 👿server online on port 3333!');
});
