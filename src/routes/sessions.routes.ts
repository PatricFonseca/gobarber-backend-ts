import { Router } from 'express';
import CreateSessionUserService from '../services/CreateSessionUserService';
const sessionsRouter = Router();

//DTO - Data Transfer Object

sessionsRouter.get('/', async (request, response) => {
  return response.json({ ok: 'ok' });
});

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionUser = new CreateSessionUserService();

    const { user } = await sessionUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
