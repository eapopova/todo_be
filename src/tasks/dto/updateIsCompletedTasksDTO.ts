import { IsBoolean } from 'class-validator';

export class UpdateIsCompletedTasksDTO {
  
  @IsBoolean()
    isCompleted: boolean

}