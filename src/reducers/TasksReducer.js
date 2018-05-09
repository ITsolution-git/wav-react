import { TaskConstants } from '../constants/reducerConstants/TaskConstants';
import InitialState from '../constants/InitialState';

export default function taskListReducer(state = InitialState.taskList, action) {
    switch (action.type) {
        case TaskConstants.TASK_LIST_REQUEST: {
            return { ...state, isFetching: true };
        }
        case TaskConstants.TASK_LIST_SUCCESS: {
            return { ...state, ...{ tasks: action.data.tasks, isFetching: false, isSuccess: true, count: action.data.count }};
        }
        case TaskConstants.TASK_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        case TaskConstants.TASK_STATE_INFO_REQUEST: {
            return { ...state, isFetching: true };
        }
        case TaskConstants.TASK_STATE_INFO_SUCCESS: {
            return { ...state, ...{ state_info: action.state_info, isFetching: false, isSuccess: true }};
        }
        case TaskConstants.TASK_STATE_INFO_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        default:
            return state
    }
}