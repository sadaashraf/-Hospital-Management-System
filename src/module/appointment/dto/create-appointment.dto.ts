
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientCode: string;

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsString()
  @IsNotEmpty()
  appointmentDate: string; // YYYY-MM-DD

  @IsString()
  @IsNotEmpty()
  appointmentTime: string; // HH:mm
}
