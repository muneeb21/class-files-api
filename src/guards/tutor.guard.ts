import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { USERTYPE } from '../constants/constants';

@Injectable()
export class TutorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userType = request.user.userType;

    if (userType && userType === USERTYPE.TUTOR) {
      return true;
    }

    return false;
  }
}
