export enum UserType {
  TUTOR = 'tutor',
  STUDENT = 'student',
}

export class CreateUserDto {
  username: string;
  password: string;
  userType: string; // Add userType field
}
