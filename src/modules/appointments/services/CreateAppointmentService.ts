import { startOfHour } from 'date-fns';
import IAppointmentsRepository from '../repositories/IApointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

interface Request{
    provider_id: 'uuid';
    date: Date;
}

class CreateAppointmentService{
constructor (private appointmentsRepository: IAppointmentsRepository) {

}


    public async execute({provider_id, date}: Request): Promise<Appointment>{

        const appointmentDate = startOfHour(date);
        const appointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
        if(appointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;