import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  acctNumber: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
