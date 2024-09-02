import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { Task } from './task.model';
import { UpdateIsCompletedTasksDTO } from './dto/updateIsCompletedTasksDTO';
import { UpdateTaskDTO } from './dto/updateTaskDTO';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  async findAllTasks(): Promise<Task[]>{
    return await this.tasksService.findAllTasks()
  } 

  @Post('create-task')
  async createTasks(@Body() dto: CreateTaskDTO): Promise<BadRequestException | Task> {
    return await this.tasksService.createTask(dto)
  }
  
  @Delete('delete-completed')
  async deleteCompletedTasks(): Promise<BadRequestException | string> {
    return await this.tasksService.deleteCompletedTasks()
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<BadRequestException | string>{
    return await this.tasksService.deleteById(id)
  }
  
  @Patch('update-all')
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
