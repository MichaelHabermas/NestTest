import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_up')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('sign_in')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
