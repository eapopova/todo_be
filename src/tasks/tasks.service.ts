import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { responseMessages } from '../response-messages';
import { UpdateIsCompletedTasksDTO } from './dto/update-is-completed-tasks.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task) private readonly taskRepository: typeof Task){}

  async findAllTasks(): Promise<Task[]>{
    return await this.taskRepository.findAll({ order: [['id', 'ASC']]})}

  async createTask(dto: Partial<CreateTaskDTO>): Promise<BadRequestException | Task> {
    const newTask = await this.taskRepository.create(dto)
    if (!newTask) {
      throw new BadRequestException(
        responseMessages.error.TASK_NOT_CREATE
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
        responseMessages.error.NOT_EXIST_COMPLETED_TASKS
      )
    }

    return responseMessages.normal.DELETE_COMPLETED_TASKS
  }

  async deleteById(id: number): Promise<BadRequestException | string> {
    const deletedTask = await this.taskRepository.destroy({
      where: { id }
    })

    if(deletedTask === 0) {
      throw new BadRequestException(responseMessages.error.NOT_EXIST_TASK)
    }

    return responseMessages.normal.DELETE_TASK_BY_ID
  }

  async updateById(id: number, dto: UpdateTaskDTO): Promise<BadRequestException | Task> {
    const [countUpdatedTasks, arrayUpdatedTasks] = await this.taskRepository.update(dto, {
      where: { id },
      returning: true
    })

    if (countUpdatedTasks === 0) {
      throw new BadRequestException(responseMessages.error.NOT_UPDATE_TASK_BY_ID)
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
      throw new BadRequestException(responseMessages.error.NOT_UPDATE_IS_COMPLETED_ALL_TASKS)
    }

    return responseMessages.normal.UPDATE_IS_COMPLETED_ALL_TASKS
  }
}
