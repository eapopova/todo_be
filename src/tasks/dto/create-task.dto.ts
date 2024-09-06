import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDTO {

  @Transform(({ value }) => (typeof value === 'string') ? value.replace(/\s\s+/g, ' ') : value)
  @Transform(({ value }) => (typeof value === 'string') ? value.trim() : value)
  @MaxLength(255)
  @IsString()  
  @IsNotEmpty()
    text: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
    isCompleted?: boolean
}
