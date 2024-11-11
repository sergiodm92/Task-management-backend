import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  status?: 'pending' | 'in_progress' | 'completed';
}
