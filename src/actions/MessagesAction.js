import MessagesConstants from '../constants/MessagesConstants';
import authStorage from '../storage/AuthStorage';
import roles from '../constants/Roles';
import MessagingService from '../services/MessagingService';

export function loadChats() {
	return dispatch => {
		dispatch(actionRequest());
		return MessagingService.loadChats().then(
			response => {
				const { data: { queue = []} = {}} = response;
				dispatch(actionSuccess(queue));
			},
			error => {
				dispatch(actionError(error.data.message));
			}
		);
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

export function loadMessages(chatId, chat) {
	return dispatch => {
		dispatch(actionRequest(chatId));
		return MessagingService.loadConversation(chatId).then(
			response => {
				const { messages = [] } = response.data;
				if (messages.length === 0) {
					let message = { ...chat };
					message.isAdmin = false;
					dispatch(actionSuccess(chatId, [ message ]));
					return;
				}
				dispatch(actionSuccess(chatId, messages));
			},
			error => {
				dispatch(actionError(error.data.message));
			}
		);
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

export function sendMessage(chatId, message) {
	return dispatch => {
		const data = {
			message,
			userid: authStorage.getLoggedUser().userid,
			isAdmin: authStorage.getCurrentRole() === roles.admin,
			base_id: chatId
		};

		return MessagingService.sendMessage(data).then(
			response => {
				dispatch(action(chatId, data));
			},
			error => {}
		)
	};

	function action(chatId, message) {
		return { type: MessagesConstants.ADD_MESSAGE, chatId, message };
	}
}