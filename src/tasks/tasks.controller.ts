import { 
  BadRequestException, 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post 
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.model';
import { UpdateIsCompletedTasksDTO } from './dto/update-is-completed-tasks.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  findAllTasks(): Promise<Task[]>{
    return this.tasksService.findAllTasks()
  } 

  @Post()
  createTasks(@Body() dto: CreateTaskDTO): Promise<BadRequestException | Task> {
    return this.tasksService.createTask(dto)
  }
  
  @Delete('delete-completed')
  deleteCompletedTasks(): Promise<BadRequestException | string> {
    return this.tasksService.deleteCompletedTasks()
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<BadRequestException | string>{
    return this.tasksService.deleteById(id)
  }
  
  @Patch()
  updateIsCompletedAllTasks(
      @Body() dto: UpdateIsCompletedTasksDTO
  ): Promise<BadRequestException | string> {
    return this.tasksService.updateIsCompletedAllTasks(dto)
  }

  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dto: UpdateTaskDTO
  ):  Promise<BadRequestException | Task> {
    return this.tasksService.updateById(id, dto)
  }
}
