import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from 'material-ui/Typography';
import { Row, Col, Button } from 'react-bootstrap';

import { loadMessages } from '../../actions/MessagesAction';
import InputText from '../shared/inputs/InputText';
import BaseComponent from '../shared/BaseComponent';

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
                isSuccess,
                error
            },
            actions: { loadMessages },
            chatId
        } = props;

        if (!isSuccess && !error) {
            loadMessages(chatId);
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
                <div className='msg-box'>{ message }</div>
            </div>
        )
    };

    renderTo = (user, message) => {
        return (
            <div className='msg-to'>
                <div className='msg-box'>{ message }</div>
                <Typography variant='caption'>{ user }</Typography>
            </div>
        )
    };

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
                                            { msg.isAdmin ? this.renderTo('Admin', msg.message) : this.renderFrom('User', msg.message) }
                                        </div>
                                    )
                                })}
                                <div className='controls'>
                                    <InputText placeholder='Compose...'
                                               autoFocus
                                               multiline
                                               rows='3'
                                               value={value}
                                               fullWidth
                                               disableUnderline={true}
                                               onChange={val => this.setState({ value: val })}

                                    />
                                    <Row>
                                        <Col md={3}>
                                            <Button disabled={!value}>Send</Button>
                                        </Col>
                                        <Col md={3} onClick={() => this.setState({ value: ''})}>
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
    const { messages, chats: { selectedChatId } } = state;
    return {
        chatId: selectedChatId,
        messages: messages[selectedChatId] || {}
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadMessages }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);