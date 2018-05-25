import UserSearchConstants from '../constants/reducerConstants/UserSearchConstants';
import searchService from '../services/SearchService';

export function searchVoters(data) {

    return dispatch => {
        dispatch(actionRequest());
        return searchService.searchVoters(data).then(
            response => {
                dispatch(actionSuccess(response.data.voters));
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: UserSearchConstants.USER_SEARCH_REQUEST };
    }
    function actionSuccess(voters) {
        return { type: UserSearchConstants.VOTER_SEARCH_SUCCESS, voters };
    }
    function actionError(error) {
        return { type: UserSearchConstants.VOTER_SEARCH_ERROR, error };
    }
}


export function searchCaptains(data) {

    return dispatch => {
        dispatch(actionRequest());
        return searchService.searchCaptains(data).then(
            response => {
                dispatch(actionSuccess(response.data.users));
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: UserSearchConstants.USER_SEARCH_REQUEST };
    }
    function actionSuccess(captains) {
        return { type: UserSearchConstants.CAPTAIN_SEARCH_SUCCESS, captains };
    }
    function actionError(error) {
        return { type: UserSearchConstants.CAPTAIN_SEARCH_ERROR, error };
    }
}