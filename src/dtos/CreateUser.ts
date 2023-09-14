'use strict';

import { IsEnum, IsNotEmpty } from 'class-validator';
import { USERTYPE_ENUM } from 'src/constants/constants';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(USERTYPE_ENUM)
  userType: USERTYPE_ENUM;
}
