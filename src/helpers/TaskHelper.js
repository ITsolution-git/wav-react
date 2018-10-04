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
            task.description = `Help ${firstname} ${lastname} register to vote`;
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
        case taskIds.preferenceTaskId: {
            task.description = `Contact ${firstname} ${lastname} to get their voting preferences`;
            task.route = routes.preferenceTask;
            break;
        }
        case taskIds.mailRegistrationTaskId: {
            task.description = `Remind ${firstname} ${lastname} to register to vote by mail`;
            task.route = routes.mailRegistrationTask;
            break;
        }
        case taskIds.reminderVoteTaskId: {
            task.description = `Remind ${firstname} ${lastname} to mail their ballot`;
            task.route = routes.reminderVoteTask;
            break;
        }
        case taskIds.regularVoteTaskId: {
            const { stateInfo = {}} = task;
            task.description = `Remind ${firstname} ${lastname} to vote on ${stateInfo['nextElection'] || ''}`;
            task.route = routes.regularVoteTask;
            break;
        }
    }
    return task;
}