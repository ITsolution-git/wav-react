import { getUrlParam } from './UrlHelper';

export function getTaskData(state, ownProps) {
    const taskId = getUrlParam(ownProps, 'taskId');
    return state.taskList.tasks.find(task => task.task_group_id === taskId);
}