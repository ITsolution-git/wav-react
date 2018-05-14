import MessagesConstants from '../constants/reducerConstants/MessagesConstants';
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
        case MessagesConstants.CLOSE_CHAT: {
            const { chatId } = action,
                chatIndex = state.chats.findIndex(chat => chat._id === chatId),
                newChats = [...state.chats ];
                newChats.splice(chatIndex, 1);

            return { ...state, ...{ chats: newChats, selectedChatId: 0 } };
        }
        default:
            return state
    }
}