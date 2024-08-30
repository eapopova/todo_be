import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDTO {

  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => value.replace(/\s\s+/g, ' '))
  @IsString()  
  @IsNotEmpty()
    text: string;

  @IsNotEmpty()
  @IsBoolean()
    isCompleted: boolean
}
