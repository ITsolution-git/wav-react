import update from 'immutability-helper';

import TaskConstants from '../constants/TaskConstants';
import InitialState from '../constants/InitialState';

export default function taskListReducer(state = InitialState.taskList, action) {
    switch (action.type) {
        case TaskConstants.TASK_LIST_REQUEST: {
            return { ...state, isFetching: true };
        }
        case TaskConstants.TASK_LIST_SUCCESS: {
            return { ...state, ...{ tasks: action.tasks, isFetching: false, isSuccess: true }};
        }
        case TaskConstants.TASK_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        default:
            return state
    }
}