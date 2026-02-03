import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }
  create(createDoctorDto: CreateDoctorDto) {
    const doctor = this.doctorRepo.create(createDoctorDto);
    return this.doctorRepo.save(doctor);
  }

  findAll() {
    return this.doctorRepo.find();
  }

  findOne(id: number) {
    const doctor = this.doctorRepo.findOneBy({ id });
    if (!doctor) {
      throw new NotFoundException(`Doctor ID not found`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorRepo.findOne({ where: { id } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    Object.assign(doctor, updateDoctorDto);
    return this.doctorRepo.save(doctor);
  }

  async remove(id: number) {
    const doctor = await this.doctorRepo.findOne({ where: { id } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return this.doctorRepo.remove(doctor);
  }
}
