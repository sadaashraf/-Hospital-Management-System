
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePatientDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  maritalStatus?: string;

  // @IsString()
  // image?: string;
  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsOptional()
  state?: string;

  @ApiProperty()
  @IsOptional()
  zipCode?: string;

  @ApiProperty()
  @IsOptional()
  emergencyName?: string;

  @ApiProperty()
  @IsOptional()
  emergencyPhone?: string;

  @ApiProperty()
  @IsOptional()
  emergencyRelation?: string;

  @ApiProperty()
  @IsOptional()
  allergies?: string;

  @ApiProperty()
  @IsOptional()
  chronicDiseases?: string;

  @ApiProperty()
  @IsOptional()
  currentMedications?: string;

  @ApiProperty()
  @IsOptional()
  previousSurgeries?: string;

  @ApiProperty()
  @IsOptional()
  additionalNotes?: string;
}
