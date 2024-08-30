import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDTO {

  @Transform(({ value }) => typeof (value) ? value.trim() : null)
  @MaxLength(255)
  @IsString()  
  @IsNotEmpty()
  @IsOptional()
    text?: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
    isCompleted?: boolean
}
