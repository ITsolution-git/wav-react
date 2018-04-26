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