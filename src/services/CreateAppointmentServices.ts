import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointmentsRepository';
//import CreateAppointmentService from '../services/CreateAppointmentServices';
//mport { getCustomRepository } from 'typeorm';
//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

//appointmentsRouter.use(ensureAuthenticated);

//Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider,
  });

  return response.json(appointment);
});

export default appointmentsRouter;











/* import {startOfHour} from 'date-fns'
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

private appointmentsRepository: AppointmentsRepository;

constructor (appointmentsRepository: AppointmentsRepository){

  this.appointmentsRepository = appointmentsRepository;
}

}

public execute({ date, provider}, : Request): Appointment {
    const appointmentDate = startOfHour(date);

  const findAppointmentInSamedate = this.appointmentsRepository.findByDate(appointmentDate);

  if (findAppointmentInSamedate) {
    throw Error('This appointment is already booked');

  }

  const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate
  });

  return appointment
  }

export default CreateAppointmentService; */