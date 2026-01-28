import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, NotFoundException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error("Only image files allowed"), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  create(
    @Body() createPatientDto: CreatePatientDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.patientsService.create(createPatientDto, file);
  }

  @Get()
  findAll(@Query() query: any) {
    console.log('Query params:', query);
    return this.patientsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}

// @Patch("update-image/:id")
// @UseInterceptors(
//   FileInterceptor("image", {
//     storage: diskStorage({
//       destination: "./public/uploads",
//       filename: (req, file, cb) => {
//         const uniqueName =
//           Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueName + extname(file.originalname));
//       },
//     }),
//     fileFilter: (req, file, cb) => {
//       if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//         return cb(new Error("Only image files allowed"), false);
//       }
//       cb(null, true);
//     },
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   }),
// )
// async updateImage(
//   @Param("id") id: string,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   if (!file) {
//     throw new NotFoundException("Image file not found");
//   }

//   return this.patientsService.updateImage(id, file.filename);
// }



