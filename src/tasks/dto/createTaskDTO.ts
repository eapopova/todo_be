import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDTO {

  @Transform(({ value }) => value.trim())
  @MaxLength(255)
  @IsString()  
  @IsNotEmpty()
    text: string;

  @IsNotEmpty()
  @IsBoolean()
    isCompleted: boolean
}
