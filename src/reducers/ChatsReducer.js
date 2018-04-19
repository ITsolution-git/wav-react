import MessagesConstants from '../constants/MessagesConstants';
import InitialState from '../constants/InitialState';

export default function chatsReducer(state = InitialState.chats, action) {

    switch (action.type) {
        case MessagesConstants.LOAD_CHAT_REQUEST: {
            return { ...state, isFetching: true };
        }
        case MessagesConstants.LOAD_CHAT_SUCCESS: {
            return { ...state, ...{ chats: action.chats, isFetching: false, isSuccess: true }};
        }
        case MessagesConstants.LOAD_CHAT_FAILURE: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        case MessagesConstants.SELECT_CHAT: {
            return { ...state, selectedChatId: action.chatId };
        }
        default:
            return state
    }
}