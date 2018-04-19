import update from 'immutability-helper';

import MessagesConstants from '../constants/MessagesConstants';
import InitialState from '../constants/InitialState';

export default function messagesReducer(state = InitialState.chats, action) {
    switch (action.type) {
        case MessagesConstants.LOAD_MESSAGES_REQUEST: {
            return { ...state, [action.chatId]: { isFetching: true }};
        }
        case MessagesConstants.LOAD_MESSAGES_SUCCESS: {
            const { messages, chatId } = action;
            return { ...state, [chatId]: {
                isFetching: false,
                isSuccess: true,
                messages
            }};
        }
        case MessagesConstants.LOAD_MESSAGES_FAILURE: {
            const { error, chatId } = action;
            return { ...state, [chatId]: {
                    isFetching: false,
                    isSuccess: false,
                    error
                }};
        }
        default:
            return state
    }
}