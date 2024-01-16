import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  create(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
