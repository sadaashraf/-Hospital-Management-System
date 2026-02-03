import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) { }

  async create(Dto: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOneBy({ patientCode: Dto.patientCode.toString() });
    if (!patient) {
      throw new Error('Patient not found');
    }
    const doctor = await this.doctorRepo.findOneBy({ id: Dto.doctorId });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    const appointment = this.appointmentRepo.create({
      patient,
      doctor,
      appointmentDate: Dto.appointmentDate,
      appointmentTime: Dto.appointmentTime,
    });
    return this.appointmentRepo.save(appointment);
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
