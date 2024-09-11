import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDTO {
  @Transform(
    ({ value }) => (typeof value === 'string') ? value.trim().replace(/\s\s+/g, ' ') : value
  )
  @MaxLength(255)
  @IsString()  
  @IsNotEmpty()
    text: string;
}

