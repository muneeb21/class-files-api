'use strict';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddStudentToClassroomDto {
  @IsNotEmpty()
  //   @IsNumber()
  classroomId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
