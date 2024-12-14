import express from 'express';
import { auth } from '../middleware/auth.js';
import { appointmentController } from '../controllers/appointmentController.js';

const router = express.Router();

router.use(auth);

router.post('/', appointmentController.createAppointment);
router.post('/slots', appointmentController.createAppointmentSlot);
router.get('/client', appointmentController.getClientAppointments);
router.get('/coach', appointmentController.getCoachAppointments);
router.put('/:id/status', appointmentController.updateAppointmentStatus);
router.get('/available-slots', appointmentController.getAvailableAppointmentSlots);

export default router;
