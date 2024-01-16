import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {}

  async signIn(dto: AuthDto) {}
}
