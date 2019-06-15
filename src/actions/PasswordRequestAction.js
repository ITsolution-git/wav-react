import PasswordRequestContants from '../constants/reducerConstants/PasswordRequestConstants';
import PasswordRequestService from '../services/PasswordRequestService';

export function forgotPasswordRequest(data) {
    return dispatch => {

        dispatch(actionRequest());
        return PasswordRequestService.forgotPasswordRequest(data).then(
            response => {
                dispatch(actionSucceeded(true));
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
    function actionFailed(error) {
        return { type: PasswordRequestContants.PASSWORD_RESET_FAILED, error };
    }
}

export function verifyTokenRequest(token) {
    return dispatch => {

        return PasswordRequestService.verifyTokenRequest(token).then(
            response => {
                console.log(response.data);
                dispatch(actionSucceeded(response.data.isValid));
            },
            error => {
                dispatch(actionFailed());
            }
        )
    };

    function actionSucceeded(isValid) {
        return { type: PasswordRequestContants.VERIFY_TOKEN_SUCCEEDED, isValid };
    }
    function actionFailed() {
        return { type: PasswordRequestContants.VERIFY_TOKEN_FAILED };
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