import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
// import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.findByUsername(username);
    console.log('TCL: AuthService -> user', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      userId: user.id,
      userType: user.userType,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
  async signup(
    username: string,
    password: string,
    userType: string,
  ): Promise<any> {
    return await this.userService.createUser({ username, password, userType });
  }

  // Add other auth-related methods
}
