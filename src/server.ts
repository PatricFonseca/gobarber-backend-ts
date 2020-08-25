import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

// routes.get('/', (request, response) => {
//   console.log('test')
//   return response.json({ message: 'Hello World' }).status(200);
// });

app.listen(3333, () => {
  console.log(' 👿server online on port 3333!');
});
