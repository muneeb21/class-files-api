import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from './classroom.entity';
import { File } from './file.entity';
// import { CreateClassroomDto, AddStudentToClassroomDto } from './dto';
import { User } from 'src/auth/user.entity';
import { ClassroomStudent } from './classroomStudent.entity';
import {
  FILE_EXTENSION_MAP,
  FILE_TYPE,
  USERTYPE,
} from 'src/constants/constants';
import * as fs from 'fs';
import * as path from 'path';
// import { extname } from 'path';

@Injectable()
export class ClassFilesService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(ClassroomStudent)
    private readonly classroomStudentRepository: Repository<ClassroomStudent>,
  ) {}

  async createClassroom(payload: any): Promise<Classroom> {
    const { name, tutorId } = payload;

    const classroom = this.classroomRepository.create({ name, tutorId });
    return this.classroomRepository.save(classroom);
  }

  async updateClassroomById(payload: any, id: number): Promise<any> {
    // const { name, tutorId } = payload;
    const classroom = await this.classroomRepository.update(
      { id },
      { ...payload },
    );

    return classroom;
  }

  async deleteClassroomById(id: number): Promise<any> {
    // const { name, tutorId } = payload;
    const classroom = await this.classroomRepository.update(
      { id },
      { isArchived: true },
    );

    return classroom;
  }

  async addStudentToClassroom(
    addStudentToClassroomDto: Record<string, any>,
  ): Promise<any> {
    const { classroomId, studentId } = addStudentToClassroomDto;
    const classroomStudent = await this.classroomStudentRepository.findOne({
      where: {
        studentId,
        classroomId,
      },
    });

    if (classroomStudent) {
      throw new NotFoundException('Student already added to classroom');
    }

    const newClassroomStudnet = this.classroomStudentRepository.create({
      classroomId,
      studentId,
    });
    await this.classroomStudentRepository.save(newClassroomStudnet);
    return { message: 'student added successfully' };
  }

  async getClassrooms(userType: string, userId: number): Promise<Classroom[]> {
    if (userType === USERTYPE.TUTOR) {
      return this.classroomRepository.find({
        where: { tutorId: userId, isArchived: false },
      });
    } else if (userType === USERTYPE.STUDENT) {
      const query = `select * from classroom inner join classroom_student on "classroom_student"."classroomId" = "classroom"."id" where "classroom_student"."studentId"  = ${userId}`;
      const classrooms = await this.classroomRepository.query(query);
      return classrooms;
    }
  }

  async uploadFile(
    userId: number,
    payload: Record<string, any>,
    file: any,
  ): Promise<any> {
    const ext = this.getFileExtension(payload.fileType);
    if (ext) {
      const targetFolderPath = path.join(__dirname, '../../', 'uploads');

      if (fs.existsSync(`${targetFolderPath}/${file.filename}`)) {
        fs.renameSync(
          `${targetFolderPath}/${file.filename}`,
          `${targetFolderPath}/${payload.name}${ext}`,
        );
      } else {
        throw new NotFoundException('File not found');
      }
    }

    const newFIle = this.fileRepository.create({
      uploadedBy: userId,
      updatedBy: userId,
      ...payload,
    });
    await this.fileRepository.save(newFIle);
    return { message: 'file added successfully' };
  }

  getFileExtension(fileType: string) {
    switch (fileType) {
      case FILE_TYPE.IMAGE:
        return FILE_EXTENSION_MAP.IMAGE;
      case FILE_TYPE.AUDIO:
        return FILE_EXTENSION_MAP.AUDIO;
      case FILE_TYPE.VIDEO:
        return FILE_EXTENSION_MAP.VIDEO;
      default:
        return '';
    }
  }

  async renameFile(
    userId: number,
    fileId: number,
    newName: string,
  ): Promise<any> {
    const file = await this.fileRepository.findOne({
      where: {
        id: fileId,
        isArchived: false,
      },
    });

    if (!file) {
      throw new NotFoundException('file does not exist');
    }
    const ext = this.getFileExtension(file.fileType);
    if (ext) {
      const targetFolderPath = path.join(__dirname, '../../', 'uploads');
      console.log(
        'TCL: ClassFilesService -> targetFolderPath',
        targetFolderPath,
      );

      if (fs.existsSync(`${targetFolderPath}/${file.name}${ext}`)) {
        fs.renameSync(
          `${targetFolderPath}/${file.name}${ext}`,
          `${targetFolderPath}/${newName}${ext}`,
        );
      } else {
        throw new NotFoundException('File not found');
      }
    }

    const newFile = await this.fileRepository.update(
      { id: fileId },
      { updatedBy: userId, name: newName },
    );
    return newFile;
  }

  async deleteFile(userId: number, fileId: number): Promise<any> {
    const file = await this.fileRepository.findOne({
      where: {
        id: fileId,
        isArchived: false,
      },
    });

    if (!file) {
      throw new NotFoundException('file does not exist');
    }
    const targetFolderPath = path.join(__dirname, '../../', 'uploads');
    console.log('TCL: targetFolderPath', targetFolderPath);

    const ext = this.getFileExtension(file.fileType);

    if (fs.existsSync(`${targetFolderPath}/${file.name}${ext}`)) {
      fs.unlinkSync(`${targetFolderPath}/${file.name}${ext}`);
    } else {
      throw new NotFoundException('File not found');
    }

    await this.fileRepository.update(
      { id: fileId },
      { updatedBy: userId, isArchived: true },
    );
    return { message: 'file deleted successfully' };
  }

  async getFiles(
    classroomId: number,
    fileType: string,
    search: string,
  ): Promise<File[]> {
    let query = `select * from file where "classroomId" = ${classroomId} and "isArchived" = false`;
    if (fileType) {
      query += ` and "fileType"=${fileType}`;
    }
    if (search) {
      query += ` and "name" LIKE %${search}%`;
    }
    console.log('TCL: ClassFilesService -> query', query);

    const files = await this.classroomRepository.query(query);
    return files;
  }

  private async getUserById(id: number): Promise<User | undefined> {
    return this.classroomRepository.manager.findOne(User, {
      where: { id },
    });
  }

  // Add other class files service methods
}
