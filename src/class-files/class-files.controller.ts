import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Request,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guards';
import { ClassFilesService } from './class-files.service';
// import { CreateClassroomDto, AddStudentToClassroomDto } from './dto';
import { Classroom } from './classroom.entity';
import { File } from './file.entity';
import { USERTYPE } from 'src/constants/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from '../multer.config';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { AddStudentToClassroomDto } from '../dtos/AddStudentToClassroomDto';
import { CreateClassroomDto } from '../dtos/CreateClassroomDto';
import { CreateFileDto } from '../dtos/CreateFileDto';
import { RenameFileDto } from '../dtos/RenameFileDto';
import { TutorGuard } from '../guards/tutor.guard';

@Controller('class-files')
@UseGuards(JwtAuthGuard)
export class ClassFilesController {
  constructor(private readonly classFilesService: ClassFilesService) {}

  @UseGuards(TutorGuard)
  @Post('classroom')
  async createClassroom(
    @Body() createClassroomDto: CreateClassroomDto,
    @Request() req,
  ): Promise<any> {
    const payload = {
      name: createClassroomDto.name,
      tutorId: req.user.userId,
    };
    console.log('TCL: ClassFilesController -> constructor -> payload', payload);
    // return payload;

    return this.classFilesService.createClassroom(payload);
  }

  @UseGuards(TutorGuard)
  @Patch('classroom/:id')
  async updateClassroom(
    @Body() createClassroomDto: CreateClassroomDto,
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Classroom> {
    const payload = {
      name: createClassroomDto.name,
      tutorId: req.userId,
    };
    return this.classFilesService.updateClassroomById(payload, id);
  }

  @UseGuards(TutorGuard)
  @Delete('classroom/:id')
  async deleteClassroom(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Classroom> {
    return this.classFilesService.deleteClassroomById(id);
  }

  @UseGuards(TutorGuard)
  @Post('addStudent')
  async addStudentToClassroom(
    @Body() addStudentToClassroomDto: AddStudentToClassroomDto,
  ): Promise<any> {
    return await this.classFilesService.addStudentToClassroom(
      addStudentToClassroomDto,
    );
  }

  @Get('class-feed')
  async getClassrooms(@Request() req): Promise<Classroom[]> {
    // return [];
    const { userType, userId } = req.user;
    console.log(
      'TCL: ClassFilesController -> constructor -> req.user',
      req.user,
    );
    return this.classFilesService.getClassrooms(userType, userId);
  }

  // above done

  @Get('files/:classroomId')
  async getFiles(
    @Param('classroomId', ParseIntPipe) classroomId: number,
    @Query('fileType') fileType: string,
    @Query('search') search: string,
  ): Promise<File[]> {
    return this.classFilesService.getFiles(classroomId, fileType, search);
  }

  @UseGuards(TutorGuard)
  @Post('file')
  @UseInterceptors(FileInterceptor('file', MulterConfig))
  async uploadFile(
    @UploadedFile() file,
    @Body() payload: CreateFileDto,
    @Request() req,
  ): Promise<any> {
    const { userType, userId } = req.user;
    console.log(payload.name, file);
    // return [];
    return this.classFilesService.uploadFile(userId, payload, file);
  }
  @UseGuards(TutorGuard)
  @Patch('file/:id')
  async renameFile(
    @Param('id') id: string,
    @Body() payload: RenameFileDto,
    @Request() req,
  ) {
    const { userType, userId } = req.user;
    return await this.classFilesService.renameFile(
      userId,
      Number(id),
      payload.newName,
    );
  }
  @UseGuards(TutorGuard)
  @Delete('file/:id')
  async deleteFile(@Param('id') id: string, @Request() req) {
    const { userType, userId } = req.user;
    return await this.classFilesService.deleteFile(userId, Number(id));
  }
}
