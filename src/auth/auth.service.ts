import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const password = await argon.hash(dto.password);

      const customer = await this.prisma.customer.create({
        data: { email: dto.email, password: password },
      });

      delete customer?.password; // TODO: add more elegant solution (Transforms) later

      return customer;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    customerId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: customerId, email };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }

  async signIn(dto: AuthDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { email: dto.email },
    });

    if (!customer) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(customer.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete customer.password;

    return this.signToken(customer.id, customer.email);
  }
}
