import UserConstansts from '../constants/reducerConstants/UserConstants';
import UserService from '../services/UserService';

export function loadUser(userId) {
    return (dispatch, getState) => {
        const user = getState().user.users[userId];
        if (!user) {
            dispatch(actionRequest());
            return UserService.loadUser(userId).then(
                response => {
                    dispatch(actionSuccess(userId, response.data));
                },
                error => {
                    dispatch(actionError(error.response.data.message));
                });
        }
    };

    function actionRequest() {
        return { type: UserConstansts.LOAD_USER_SUCCESS };
    }
    function actionSuccess(id, user) {
        return { type: UserConstansts.LOAD_USER_SUCCESS, id, user };
    }
    function actionError(error) {
        return { type: UserConstansts.LOAD_USER_FAILURE, error };
    }
}

export function deleteUser(data) {
    return dispatch => {
        dispatch(actionRequest());
        return UserService.deleteUser(data).then(
            result => {
                dispatch(actionSuccess());
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: UserConstansts.DELETE_USER_REQUEST };
    }
    function actionSuccess() {
        return { type: UserConstansts.DELETE_USER_SUCCESS };
    }
    function actionError(error) {
        return { type: UserConstansts.DELETE_USER_FAILURE, error };
    }
} 

export function unsubscribeUser(email) {
	return dispatch => {
		const data = {
			email
		};
		
		dispatch(actionRequest)
		return UserService.unsubscribeUser(data).then(
			response => {
				dispatch(actionSucceeded(response.data));
			},
			error => {
				dispatch(actionFailed(error));
			});
	};

	function actionSucceeded(data) {
		return { type: UserConstansts.UNSUBSCRIBE_SUCCESS, data };
    }
    function actionRequest() {
        return { type: UserConstansts.UNSUBSCRIBE_REQUEST };
    }
    function actionFailed(err) {
        return { type: UserConstansts.UNSUBSCRIBE_FAILURE, err };
    }
}

export function updateProfile(data) {
	return dispatch => {
		
		dispatch(actionRequest())
		return UserService.updateProfile(data).then(
			response => {
				dispatch(actionSucceeded());
			},
			error => {
				dispatch(actionFailed(error));
			});
	};

	function actionSucceeded() {
		return { type: UserConstansts.UPDATE_PROFILE_SUCCESS };
    }
    function actionRequest() {
        return { type: UserConstansts.UPDATE_PROFILE_REQUEST };
    }
    function actionFailed(err) {
        return { type: UserConstansts.UPDATE_PROFILE_FAILURE, err };
    }
}