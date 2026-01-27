
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @IsString()
  image?: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  address: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  zipCode?: string;

  @IsOptional()
  emergencyName?: string;

  @IsOptional()
  emergencyPhone?: string;

  @IsOptional()
  emergencyRelation?: string;

  @IsOptional()
  allergies?: string;

  @IsOptional()
  chronicDiseases?: string;

  @IsOptional()
  currentMedications?: string;

  @IsOptional()
  previousSurgeries?: string;

  @IsOptional()
  additionalNotes?: string;
}
