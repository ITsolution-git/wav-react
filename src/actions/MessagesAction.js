import MessagesConstants from '../constants/MessagesConstants';
import authStorage from '../storage/AuthStorage';

export function loadChats() {
    return dispatch => {
        dispatch(actionRequest());
        dispatch(actionSuccess([
            {
                _id: '1',
                message: 'some text1',
                date: '2018-04-01'
            },
            {
                _id: '2',
                message: 'some text2',
                date: '2018-04-02'
            },
            {
                _id: '3',
                message: 'some text3',
                date: '2018-04-03'
            },
            {
                _id: '4',
                message: 'some text4',
                date: '2018-04-04'
            },
            {
                _id: '5',
                message: 'some text5',
                date: '2018-04-05'
            },
            {
                _id: '6',
                message: 'some text6',
                date: '2018-04-06'
            }
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


export function selectChat(chatId) {
    return dispatch => {
        dispatch(action(chatId));
        function action(chatId) {
            return { type: MessagesConstants.SELECT_CHAT, chatId };
        }
    }
}