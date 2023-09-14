'use strict';

import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { FILE_TYPE_ENUM } from 'src/constants/constants';

export class CreateFileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  fileDetails: string;

  @IsNotEmpty()
  // @IsNumber()
  classroomId: number;

  @IsEnum(FILE_TYPE_ENUM)
  fileType: FILE_TYPE_ENUM;
}
