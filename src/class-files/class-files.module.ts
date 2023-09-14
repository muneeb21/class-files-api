import { Module } from '@nestjs/common';
import { ClassFilesService } from './class-files.service';
import { ClassFilesController } from './class-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { File } from './file.entity';
import { ClassroomStudent } from './classroomStudent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom, File, ClassroomStudent])],
  providers: [ClassFilesService],
  controllers: [ClassFilesController],
})
export class ClassFilesModule {}
