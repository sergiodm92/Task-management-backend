import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTagDTO {
  @IsString()
  @Length(1, 50, { message: 'The name must be between 1 and 50 characters long' })
  name: string;

  @IsString()
  @IsOptional()
  @Length(1, 15, { message: 'The color must be between 1 and 15 characters long' })
  color?: string;
}