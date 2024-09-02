import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { ResponseMessages } from 'src/responseMessages';
import { UpdateIsCompletedTasksDTO } from './dto/updateIsCompletedTasksDTO';
import { UpdateTaskDTO } from './dto/updateTaskDTO';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task) private readonly taskRepository: typeof Task){}

  async findAllTasks(): Promise<Task[]>{
    return await this.taskRepository.findAll({ order: [['id', 'ASC']]})}

  async createTask(dto: Partial<CreateTaskDTO>): Promise<BadRequestException | Task> {
    const newTask = await this.taskRepository.create(dto)
    if (!newTask) {
      throw new BadRequestException(
        ResponseMessages.error.TASK_NOT_CREATE
      )
    }
    return newTask
  }

  async deleteCompletedTasks(): Promise<BadRequestException | string> {
    const deletedTasks = await this.taskRepository.destroy({
      where: { isCompleted: true }
    })
    
    if(deletedTasks === 0) {
      throw new BadRequestException(
        ResponseMessages.error.NOT_EXIST_COMPLETED_TASKS
      )
    }

    return ResponseMessages.normal.DELETE_COMPLETED_TASKS
  }

  async deleteById(id: number): Promise<BadRequestException | string> {
    const deletedTask = await this.taskRepository.destroy({
      where: { id }
    })

    if(deletedTask === 0) {
      throw new BadRequestException(ResponseMessages.error.NOT_EXIST_TASK)
    }

    return ResponseMessages.normal.DELETE_TASK_BY_ID
  }

  async updateById(id: number, dto: UpdateTaskDTO): Promise<BadRequestException | Task> {
    const [countUpdatedTasks, arrayUpdatedTasks] = await this.taskRepository.update(dto, {
      where: { id },
      returning: true
    })

    if (countUpdatedTasks === 0) {
      throw new BadRequestException(ResponseMessages.error.NOT_UPDATE_TASK_BY_ID)
    }
    return arrayUpdatedTasks[0]
  }

  async updateIsCompletedAllTasks(
    dto: UpdateIsCompletedTasksDTO
  ): Promise<BadRequestException | string> {
    const countUpdateTasks = await this.taskRepository.update(dto, {
      where: { isCompleted: !dto.isCompleted}
    })

    if (countUpdateTasks[0] === 0 ) {
      throw new BadRequestException(ResponseMessages.error.NOT_UPDATE_IS_COMPLETED_ALL_TASKS)
    }

    return ResponseMessages.normal.UPDATE_IS_COMPLETED_ALL_TASKS
  }
}
