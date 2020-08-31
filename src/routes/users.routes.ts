import { Router, request, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

//DTO - Data Transfer Object

usersRouter.get('/', async (request, response) => {
  // const appointments = appointmentsRepository.all();

  return response.json({ ok: 'ok' });
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
