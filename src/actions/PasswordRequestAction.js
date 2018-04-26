import PasswordRequestContants from '../constants/PasswordRequestConstants';
import PasswordRequestService from '../services/PasswordRequestService';

export function forgotPasswordRequest(email) {
    return dispatch => {
        const data = {
            captainEmail: email
        };

        return PasswordRequestService.forgotPasswordRequest(data).then(
            response => {
                dispatch(action());
            },
            error => {}
        )
    };

    function action() {
        return { type: PasswordRequestContants.PASSWORD_RESET_REQUEST };
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