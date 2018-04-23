import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import { Row, Col, Button } from 'react-bootstrap';

import authStorage from '../../storage/AuthStorage';
import { loadMessages, sendMessage } from '../../actions/MessagesAction';
import BaseComponent from '../shared/BaseComponent';
import roles from '../../constants/Roles';

class ChatBody extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: ''
		}
	}

	componentWillReceiveProps(props) {
		const {
			      messages: {
				      messages = [],
				      isSuccess,
				      isFetching,
				      error
			      },
			      actions: { loadMessages },
			      chatId,
			      chat
		      } = props;

		if (messages.length === 0 && chatId && !isFetching && !isSuccess && !error) {
			loadMessages(chatId, chat);
		}
	}

	renderText = (msg) => {
		return (
			<div className='msg-text'>
				<Typography>{ msg }</Typography>
			</div>
		);
	};

	renderFrom = (user, message) => {
		return (
			<div className='msg-from'>
				<Typography variant='caption'>{ user }</Typography>
				<div className='msg-box'>{ this.formatMessage(message) }</div>
			</div>
		)
	};

	renderTo = (user, message) => {
		return (
			<div className='msg-to'>
				<div className='msg-box'>{ this.formatMessage(message) }</div>
				<Typography variant='caption'>{ user }</Typography>
			</div>
		)
	};

	formatMessage = (msg) => {
		const jsonMsg = msg.parseJson();
		if (jsonMsg) {
			return (
				<div>
					<div>Task: { jsonMsg.task }</div>
					<div>Checkpoint: { jsonMsg.checkpoint } </div>
					<div>Question: { jsonMsg.question }</div>
				</div>
			)
		}
		return msg;
	};

	sendMessage = () => {
		const {
			      actions: { sendMessage },
			      chatId
		      } = this.props;

		sendMessage(chatId, this.state.value);
		this.setState({ value: ''});
	};

	scrollToBottom = () => {
		if (this.messagesEnd) {
			this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
		}
	};

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		const {
			      chatId,
			      messages: { messages }
		      } = this.props;
		const { value } = this.state;
		return (
			<div className='chat-body'>
				{ chatId
					? messages
						? (
							<div className='messages'>
								{ messages.map((msg, i) => {
									return (
										<div key={i}>
											{authStorage.getCurrentRole() === roles.admin
												? msg.isAdmin
													? this.renderTo('Admin', msg.message)
													: this.renderFrom('User', msg.message)
												: msg.isAdmin
													? this.renderFrom('Admin', msg.message)
													: this.renderTo('User', msg.message)
											}
										</div>
									)
								})}
								<div ref={(el) => { this.messagesEnd = el; }} ></div>
								<div className='controls'>
									<Input placeholder='Compose...'
									       autoFocus
									       multiline
									       rows='3'
									       value={value}
									       fullWidth
									       disableUnderline={true}
									       onChange={e => this.setState({ value: e.target.value })}

									/>
									<Row>
										<Col md={3} xs={6}>
											<Button disabled={!value} onClick={this.sendMessage}>Send</Button>
										</Col>
										<Col md={3} xs={6} onClick={() => this.setState({ value: ''})}>
											<Button>Cancel</Button>
										</Col>
									</Row>
								</div>
							</div>
						)
						: this.renderText('No messages')
					: this.renderText('Please select conversation')
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { messages } = state;
	const { selectedChatId, chats = [] } = state.chats;
	return {
		chatId: selectedChatId,
		messages: messages[selectedChatId] || {},
		chat: chats.find(chat => chat._id === selectedChatId)
	}
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ loadMessages, sendMessage }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);