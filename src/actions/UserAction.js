import UserConstansts from '../constants/UserConstants';
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
