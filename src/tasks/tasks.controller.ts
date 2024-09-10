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
  async findAllTasks(): Promise<Task[]>{
    return await this.tasksService.findAllTasks()
  } 

  @Post()
  async createTasks(@Body() dto: CreateTaskDTO): Promise<BadRequestException | Task> {
    return await this.tasksService.createTask(dto)
  }
  
  @Delete('delete-completed')
  async deleteCompletedTasks(): Promise<BadRequestException | string> {
    return await this.tasksService.deleteCompletedTasks()
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<BadRequestException | string>{
    return this.tasksService.deleteById(id)
  }
  
  @Patch()
  async updateIsCompletedAllTasks(
      @Body() dto: UpdateIsCompletedTasksDTO
  ): Promise<BadRequestException | string> {
    return await this.tasksService.updateIsCompletedAllTasks(dto)
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dto: UpdateTaskDTO
  ):  Promise<BadRequestException | Task> {
    return await this.tasksService.updateById(id, dto)
  }
}
