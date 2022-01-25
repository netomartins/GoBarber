import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { getCustomRepository } from 'typeorm';
import AppError from './../errors/AppError';

interface Request{
    provider_id: 'uuid';
    date: Date;
}

class CreateAppointmentService{
    public async execute({provider_id, date}: Request): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const appointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
        if(appointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;