import { TaskConstants } from '../constants/reducerConstants/TaskConstants';
import taskService from '../services/TaskService';
import authStorage from '../storage/AuthStorage';
import taskIds from '../constants/TaskIds';

export function loadTaskList() {
    return dispatch => {
        dispatch(actionRequest());
        const { userid } = authStorage.getLoggedUser();
        return taskService.loadTaskList(userid).then(
            response => {
                const { data } = response;
                dispatch(loadStatesInfo(data.tasks));
                dispatch(loadTasksSuccess(data));
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: TaskConstants.TASK_LIST_REQUEST };
    }
    function actionError(error) {
        return { type: TaskConstants.TASK_LIST_ERROR, error };
    }
}


export function loadStatesInfo(tasks) {
    return dispatch => {
        let regularTasks = tasks.filter(task => task.task_group_id === taskIds.regularVoteTaskId);
        const statesPromises = regularTasks.map(task => taskService.getStateInfo(task.voter_metaData.state));
        if (statesPromises.length > 0) {
            return Promise.all(statesPromises).then(
                results => {
                    regularTasks.forEach((task, i) => {
                        task.stateInfo = results[i].data.state_info;
                    });
                    const newTasks = tasks.map(task => regularTasks.find(rt => rt._id === task._id) || task);
                    dispatch(loadTasksSuccess({ tasks: newTasks }));
                }
            );
        }
    };
}

function loadTasksSuccess(data) {
    return { type: TaskConstants.TASK_LIST_SUCCESS, data };
}