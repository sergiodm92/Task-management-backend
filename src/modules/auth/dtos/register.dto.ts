import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @MinLength(3, { message: 'Email must be at least 3 characters long' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
