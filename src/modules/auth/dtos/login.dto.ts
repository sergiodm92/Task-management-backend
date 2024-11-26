import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}