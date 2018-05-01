import { getUrlParam } from './UrlHelper';
import taskIds from "../constants/TaskIds";
import routes from "../constants/Routes";

export function getTaskData(state, ownProps) {
    const taskId = getUrlParam(ownProps, 'taskId');
    return state.taskList.tasks.find(task => task._id === taskId);
}

export function resolveTaskData(task) {
    const {
        task_group_id,
        task_description,
        voter_metaData: {
            firstname,
            lastname
        } = {}
    } = task;
    task.route = null;
    task.description = task_description;

    switch (task_group_id) {
        case taskIds.updateYourProfileId: {
            task.route = routes.updateProfileTask;
            break;
        }
        case taskIds.literatureTextId: {
            task.route = routes.literatureTextTask;
            break;
        }
        case taskIds.literatureVideoId: {
            task.route = routes.literatureVideoTask;
            break;
        }
        case taskIds.recruitingVoterId: {
            task.route = routes.recruitingCaptainTask;
            break;
        }
        case taskIds.registerVoterId: {
            task.description = `Help ${firstname} ${lastname} get registered`;
            task.route = routes.registerVoterTask;
            break;
        }
        case taskIds.addVoterId: {
            task.route = routes.addVoterTask;
            break;
        }
        case taskIds.updateVoterProfileId: {
            task.description = `Update ${firstname} ${lastname}'s profile`;
            task.route = routes.updateProfileTask;
            break;
        }
    }
    return task;
}