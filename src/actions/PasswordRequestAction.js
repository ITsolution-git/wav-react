import PasswordRequestContants from '../constants/reducerConstants/PasswordRequestConstants';
import PasswordRequestService from '../services/PasswordRequestService';

export function forgotPasswordRequest(email) {
    return dispatch => {
        const data = {
            captainEmail: email
        };
    
        dispatch(actionRequest());
        return PasswordRequestService.forgotPasswordRequest(data).then(
                response => {
                dispatch(actionSucceeded(response.data.request_id !== undefined));
            },
            error => {
                dispatch(actionFailed(error));
            }
        )
    };
    
    function actionSucceeded(isUserFound) {
        return { type: PasswordRequestContants.PASSWORD_RESET_SUCCEEDED, isUserFound };
    }
    function actionRequest() {
        return { type: PasswordRequestContants.PASSWORD_RESET_REQUEST };
    }
    function actionFailed(err) {
        return { type: PasswordRequestContants.PASSWORD_RESET_FAILED, err };
    }
}

export function verifyUserRequest(data) {
    return dispatch => {

        return PasswordRequestService.verifyUserRequest(data).then(
            response => {
                if (response.data.user) {
                    dispatch(actionSucceeded(response.data.user));
                } else {
                    dispatch(actionFailed());
                }
            },
            error => {
                dispatch(actionFailed());
            }
        )
    };

    function actionSucceeded(user) {
        return { type: PasswordRequestContants.VERIFY_USER_SUCCEEDED, user };
    }
    function actionFailed() {
        return { type: PasswordRequestContants.VERIFY_USER_FAILED };
    }
}

export function changePasswordRequest(data) {
    return dispatch => {

        return PasswordRequestService.changePasswordRequest(data).then(
            response => {
                dispatch(actionSucceeded());
            },
            error => {
                dispatch(actionFailed());
            }
        )
    };

    function actionSucceeded() {
        return { type: PasswordRequestContants.CHANGE_PASSWORD_SUCCEEDED };
    }
    function actionFailed() {
        return { type: PasswordRequestContants.CHANGE_PASSWORD_FAILED };
    }
}