import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from 'classnames';
import Moment from 'react-moment';

import BaseComponent from '../shared/BaseComponent';
import ChatBody from './ChatBody';
import { loadChats, selectChat } from "../../actions/MessagesAction";
import Paginator from '../shared/Paginator';

class MessageList extends BaseComponent {
    state = {
      currentChats: []
    };

    componentWillMount() {
        this.props.actions.loadChats();
    }

    formatMessage = (msg) => {
        const jsonMsg = msg.parseJson();
        if (jsonMsg) {
            return (
                <div>
                    <div>Task: { jsonMsg.task }</div>
                    <div>Question: { this.cutMsg(jsonMsg.question )}</div>
                </div>
            )
        }
        return this.cutMsg(msg);
    };

    cutMsg = (msg) => {
        return `${msg.substring(0,100)}...`;
    };


    render() {
        const { chats, selectedChatId } = this.props.chats,
            { currentChats } = this.state;
        return (
            <div className='container btw-message-list'>
                <div>Message list</div>
                <Row className='chat-content'>
                    <Col md={4}>
                        <div className='chats'>
                            { currentChats.map((chat, i) => {
                                return (
                                    <Row key={i}
                                         className={classnames('chat', { 'selected': chat._id === selectedChatId })}
                                         onClick={() => this.props.actions.selectChat(chat._id) }>
                                        <Col md={8}>
                                            <div>{ this.formatMessage(chat.message) }</div>
                                        </Col>
                                        <Col md={4}>
                                            <div>
                                                <Moment format="MM-DD HH:mm">
                                                    { chat.date }
                                                </Moment>
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            })}
                            { chats.length === 0 &&
                                <div className='msg-text'>
                                    <div>No conversations</div>
                                </div> }
                            <Paginator items={chats}
                                       pageSize={5}
                                       onItemsChange={items => this.setState({ currentChats: items })}/>
                        </div>
                    </Col>
                    <Col md={8}>
                        <ChatBody />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.chats
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadChats, selectChat }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);