import { Router } from 'express';
import CreateSessionUserService from '../services/CreateSessionUserService';
const sessionsRouter = Router();

//DTO - Data Transfer Object

sessionsRouter.get('/', async (request, response) => {
  return response.json({ ok: 'ok' });
});

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const sessionUser = new CreateSessionUserService();

  const { user, token } = await sessionUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
