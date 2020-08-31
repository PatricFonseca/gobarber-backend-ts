import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  /**
   * o Método findOne retorna uma promise, logo toda a função findByDate se torna
   * uma promise sendo assim tem que retornar uma promise
   */

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment => {
    //   return isEqual(date, appointment.date);
    // });

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
}

export default AppointmentsRepository;
