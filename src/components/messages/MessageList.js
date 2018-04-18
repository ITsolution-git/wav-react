import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from 'material-ui/Typography';

import BaseComponent from '../shared/BaseComponent';
import { loadChats } from "../../actions/MessagesAction";

class MessageList extends BaseComponent {
    componentWillMount() {
        const { actions, chats: { isSuccess, error } } = this.props;
        if (!isSuccess && !error) {
            actions.loadChats();
        }
    }

    render() {
        const { chats } = this.props.chats;
        console.log(chats);

        return (
            <div className='container btw-message-list'>
                <Row>
                    <Col md={4}>
                        <Typography>Message list</Typography>
                        { chats.map((chat, i) => {
                            return <div key={i}>First name Last name</div>
                        })}
                    </Col>
                    <Col md={8}>

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
    actions: bindActionCreators({ loadChats }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);