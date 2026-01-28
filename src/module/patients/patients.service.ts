import { Injectable, NotFoundException } from '@nestjs/common';
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
      image: file?.filename,
    });
    return this.patientRepo.save(patient);
  }

  async findAll(query: any = {}) {
    const { search, gender, status } = query;
    const qb = this.patientRepo.createQueryBuilder("patient");

    if (search) {
      qb.andWhere(
        "(patient.firstName ILIKE :search OR patient.lastName ILIKE :search)",
        { search: `%${search}%` },
      );
    }

    if (gender) qb.andWhere("patient.gender = :gender", { gender });
    if (status) qb.andWhere("patient.status = :status", { status });

    return qb.orderBy("patient.createdAt", "DESC").getMany();
  }

  async findOne(id: number) {
    try {
      const patient = await this.patientRepo.findOneBy({ id });
      if (patient) {
        return patient;
      }
      throw new NotFoundException("id not found");
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const patient = await this.patientRepo.findOneBy({ id })
      if (!patient) {
        throw new NotFoundException("id not found");
      }
      Object.assign(patient, updatePatientDto)
      return this.patientRepo.save(patient)
    } catch (error) {
      throw error;
    }

  }


  remove(id: number) {
    this.patientRepo.delete({ id });
    return {
      status: "ok",
      message: "delete successful"
    };
  }
}


// async updateImage(id: string, image: string) {
//   const patient = await this.patientRepo.findOne({ where: { id: +id } });

//   if (!patient) {
//     throw new NotFoundException("Patient not found");
//   }

//   patient.image = image;
//   return this.patientRepo.save(patient);
// }
