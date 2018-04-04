import TaskConstants from '../constants/TaskConstants';
import taskService from '../services/TaskService';
import authStorage from '../storage/AuthStorage';

export function loadTaskList() {
    return dispatch => {
        dispatch(actionRequest());
        const { userid } = authStorage.getLoggedUser();
        const testTasks =  [
            {
                "_id": "5ac516e2b986030004bfdc19",
                "captain_metaData": [
                    "phonenumber",
                    "dateofbirth",
                    "zipcode"
                ],
                "task_group_id": "TS_GRP_001",
                "task_description": "Update your profile"
            },
            {
                "voter_metaData": {
                    "voterid": {
                        "$oid": "xxxxxxx"
                    },
                    "isRegistered": false
                },
                "task_group_id": "TS_GRP_004",
                "task_description": "Get unregistered voters to be registered"
            },
            {
                "userid": {
                    "$oid": "5ac289b317e97e000415d481"
                },
                "literature_metaData": {
                    "resource": "https://www.theatlantic.com/politics/archive/2015/09/why-non-voters-matter/405250/"
                },
                "task_group_id": "TS_GRP_003",
                "task_description": "Read an article"
            },
            {
                "userid": {
                    "$oid": "5ac2897017e97e000415d480"
                },
                "literature_metaData": {
                    "resource": "https://www.theatlantic.com"
                },
                "task_group_id": "TS_GRP_002",
                "task_description": "Watch a video"
            },
            {
                "userid": {
                    "$oid": "5ac2897017e97e000415d480"
                },
                "task_group_id": "TS_GRP_006",
                "task_description": "Add new voters"
            },
            {
                "userid": {
                    "oid": "5a9ef16cb749c8b5a2c4087e"
                },
                "voter_metaData": {
                    "voterid": {
                        "$oid": "5ac2c2adda35f24720128ec1"
                    },
                    "fields": ["firstname", "lastname"]
                },
                "task_group_id": "TS_GRP_001",
                "task_description": "Update your voter profile"
            }
        ];
        dispatch(actionSuccess(testTasks));
        // return taskService.loadTaskList(userid).then(
        //     response => {
        //         dispatch(actionSuccess(response.data.voters));
        //     },
        //     error => {
        //         dispatch(actionError(error.response.data.message));
        //     });
    };

    function actionRequest() {
        return { type: TaskConstants.TASK_LIST_REQUEST };
    }
    function actionSuccess(tasks) {
        return { type: TaskConstants.TASK_LIST_SUCCESS, tasks };
    }
    function actionError(error) {
        return { type: TaskConstants.TASK_LIST_ERROR, error };
    }
}
