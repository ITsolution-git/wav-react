import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from 'material-ui/Typography';

import BaseComponent from '../shared/BaseComponent';

class ChatBody extends BaseComponent {
    componentWillMount() {
        // const { actions, chats: { isSuccess, error } } = this.props;
        // if (!isSuccess && !error) {
        //     actions.loadChats();
        // }
    }

    render() {


        return (
            <div className='chat-body'>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);