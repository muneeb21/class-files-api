'use strict';

import { IsNotEmpty } from 'class-validator';

export class RenameFileDto {
  @IsNotEmpty()
  newName: string;
}
