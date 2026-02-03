import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.appointmentRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    const appointment = this.appointmentRepo.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });

    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentRepo.save(appointment);

  }

  findToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.appointmentRepo.find({
      where: { appointmentDate: today },
    });
  }

  async updateStatus(id: number, status: any) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');

    appointment.status = status;
    return this.appointmentRepo.save(appointment);
  }

  async remove(id: number) {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return this.appointmentRepo.delete(id);
  }
}
