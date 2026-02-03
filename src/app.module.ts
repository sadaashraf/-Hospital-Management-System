import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PatientsModule } from './module/patients/patients.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { DoctorModule } from './module/doctor/doctor.module';
import { AppointmentModule } from './module/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseConfig),
    PatientsModule,
    UserModule,
    AuthModule,
    DoctorModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
