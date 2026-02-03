import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  specialization: string;

  @IsString()
  department: string;

  @IsString()
  phone: string;
}
