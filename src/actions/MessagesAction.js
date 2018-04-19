import MessagesConstants from '../constants/MessagesConstants';
import authStorage from '../storage/AuthStorage';

export function loadChats() {
    return dispatch => {
        dispatch(actionRequest());
        dispatch(actionSuccess([
            {
                _id: '1',
                message: 'some text1',
                date: '2018-04-18T19:38:41.800Z'
            },
            {
                _id: '2',
                message: 'some text2',
                date: '2018-04-18T19:38:41.800Z'
            },
            {
                _id: '3',
                message: 'some text3',
                date: '2018-04-18T19:38:41.800Z'
            },
            {
                _id: '4',
                message: 'some text4',
                date: '2018-04-18T19:38:41.800Z'
            },
            {
                _id: '5',
                message: 'some text5',
                date: '2018-04-18T19:38:41.800Z'
            },
            {
                _id: '6',
                message: 'some text6',
                date: '2018-04-18T19:38:41.800Z'
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

export function loadMessages(chatId) {
    return dispatch => {
        const messages = {
            '1': [
                {
                    message: 'Hello',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: 'Hi',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `I can't add voter, could you help?`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: `Yes, sure I'll have a look`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `Yes, sure I'll have a look`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
            ],
            '2': [
                {
                    message: 'Hello2',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: 'Hi2',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `I can't add voter, could you help?2`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: `Yes, sure I'll have a look2`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `Yes, sure I'll have a look2`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
            ],
            '3': [
                {
                    message: 'Hello3',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: 'Hi3',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `I can't add voter, could you help?3`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: `Yes, sure I'll have a look3`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `Yes, sure I'll have a look3`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
            ],
            '4': [
                {
                    message: 'Hello4',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: 'Hi4',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `I can't add voter, could you help?4`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: `Yes, sure I'll have a look4`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `Yes, sure I'll have a look4`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
            ],
            '5': [
                {
                    message: 'Hello5',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: 'Hi5',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `I can't add voter, could you help?5`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: `Yes, sure I'll have a look5`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `Yes, sure I'll have a look5`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
            ],
            '6': [
                {
                    message: 'Hello6',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: 'Hi6',
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `I can't add voter, could you help?6`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: false
                },
                {
                    message: `Yes, sure I'll have a look6`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
                {
                    message: `Yes, sure I'll have a look6`,
                    date: '2018-04-18T19:38:41.800Z',
                    isAdmin: true
                },
            ]
        };

        dispatch(actionRequest(chatId));
        dispatch(actionSuccess(chatId, messages[chatId]));
    };

    function actionRequest(chatId) {
        return { type: MessagesConstants.LOAD_MESSAGES_REQUEST, chatId };
    }
    function actionSuccess(chatId, messages) {
        return { type: MessagesConstants.LOAD_MESSAGES_SUCCESS, chatId, messages };
    }
    function actionError(chatId, error) {
        return { type: MessagesConstants.LOAD_MESSAGES_FAILURE, chatId, error };
    }
}