import { getRepository } from 'typeorm';
import CreateAppointmentService from './CreateAppointmentService';
import User from '../models/User';
import { compare } from 'bcryptjs';

interface SessionRequest {
  email: string;
  password: string;
}

interface SessionResponse {
  user: User;
}
class CreateSessionUserService {
  public async execute({
    email,
    password,
  }: SessionRequest): Promise<SessionResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    //user.password - senha criptografada
    //password - senha não criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    return {
      user,
    };
  }
}

export default CreateSessionUserService;
