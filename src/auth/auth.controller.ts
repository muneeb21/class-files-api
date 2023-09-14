import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dtos/loginDto';
import { CreateUserDto } from '../dtos/CreateUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body.username, body.password);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.authService.signup(
      body.username,
      body.password,
      body.userType,
    );
  }

  // Add other auth-related endpoints
}
