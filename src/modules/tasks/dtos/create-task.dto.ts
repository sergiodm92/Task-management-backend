import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString, IsArray } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty({ message: 'title is required'})
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'in_progress', 'completed'], { message: 'The state must be either pending, in_progress or completed' })
  status?: 'pending' | 'in_progress' | 'completed';

  @IsArray()
  @IsOptional()
  tags?: number[];
}
