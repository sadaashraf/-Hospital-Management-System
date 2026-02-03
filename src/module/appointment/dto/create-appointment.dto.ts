
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  patientCode: number;

  @IsNumber()
  doctorId: number;

  @IsString()
  appointmentDate: string; // YYYY-MM-DD

  @IsString()
  appointmentTime: string; // HH:mm
}
