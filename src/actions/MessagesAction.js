import MessagesConstants from '../constants/MessagesConstants';
import authStorage from '../storage/AuthStorage';

export function loadChats() {
    return dispatch => {
        dispatch(actionRequest());
        dispatch(actionSuccess([
            { },
            { },
            { },
            { },
            { }
        ]));
        // return messagesService.loadChats(userid).then(
        //     response => {
        //         dispatch(actionSuccess(response.data));
        //     },
        //     error => {
        //         dispatch(actionError(error.response.data.message));
        //     });
    };

    function actionRequest() {
        return { type: MessagesConstants.LOAD_CHAT_REQUEST };
    }
    function actionSuccess(chats) {
        return { type: MessagesConstants.LOAD_CHAT_SUCCESS, chats };
    }
    function actionError(error) {
        return { type: MessagesConstants.LOAD_CHAT_FAILURE, error };
    }
}
