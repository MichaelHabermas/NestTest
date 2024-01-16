import { Injectable } from '@nestjs/common';
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
  constructor() {
  }

  async signUp(dto: AuthDto) {}

  async signIn(dto: AuthDto) {}
}
