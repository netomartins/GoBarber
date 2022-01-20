import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import appointment from '../models/appointment';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = createAppointment.execute({ date: parsedDate, provider});



  return response.json(appointment);
});

export default appointmentsRouter;
