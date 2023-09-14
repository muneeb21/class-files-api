'use strict';

import { IsNotEmpty } from 'class-validator';

export class CreateClassroomDto {
  @IsNotEmpty()
  name: string;
}
