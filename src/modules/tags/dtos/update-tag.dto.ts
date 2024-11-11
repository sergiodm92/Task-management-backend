import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateTagDTO {
  @IsString()
  @Length(1, 50, { message: 'The name must be between 1 and 50 characters long' })
  @IsOptional()
  name?: string;

  @IsString()
  @Length(1, 15, { message: 'The color must be between 1 and 15 characters long' })
  @IsOptional()
  color?: string;

}
