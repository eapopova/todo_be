import { ResponseMessagesInterface } from './types/ResponseMessagesInterface'

export const ResponseMessages: ResponseMessagesInterface = {
  normal: {
    DATABASE_IS_EMPTY: 'Empty database',
    DELETE_COMPLETED_TASKS: 'Completed tasks have been deleted',
    CREATE_TASK: 'The task was successfully created',
    DELETE_TASK_BY_ID: 'The selected task was successfully deleted',
    TASK_UPDATE: 'The task has been successfully updated',
    UPDATE_IS_COMPLETED_ALL_TASKS: 'Successfully updated completed state of accomplishment for all tasks'
  },
  error: {
    NOT_EXIST_TASK: 'There is no such task',
    NOT_EXIST_COMPLETED_TASKS: 'No tasks completed',
    TASK_NOT_CREATE: 'Failed to create a task',
    NOT_UPDATE_TASK_BY_ID: 'Failed to update this task',
    NOT_UPDATE_IS_COMPLETED_ALL_TASKS: 'Failed to update the completion status of all tasks. Probably no tasks are available'
  }
}