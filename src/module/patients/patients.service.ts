import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {

  constructor(@InjectRepository(Patient)
  private readonly patientRepo: Repository<Patient>
  ) { }

  create(createPatientDto: CreatePatientDto, file: Express.Multer.File) {
    const patient = this.patientRepo.create({
      ...createPatientDto,
      image: file.filename
    });
    return this.patientRepo.save(patient);
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
