import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IApointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService{
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date, user_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

      if(isBefore(appointmentDate, Date.now())) {
        throw new AppError("You can't create an appointment on past date")
      }

      if (user_id === provider_id) {
        throw new AppError("You can't create an appointment with yourself")
      }

      if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
        throw new AppError("You can only create appointment between 8am and 17pm")
      }


      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate,
        );


    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });



    return appointment;
  }
}

export default CreateAppointmentService;
