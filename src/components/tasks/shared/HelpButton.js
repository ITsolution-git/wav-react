import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import FontAwesome from 'react-fontawesome';

import InputText from '../../shared/inputs/InputText';
import BaseComponent from '../../shared/BaseComponent';
import { sendHelpQuestion } from '../../../actions/TaskAction';
import Dialog from '../../shared/Dialog';
import Button from '../../shared/Button';

class HelpButton extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            value: ''
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, value: '' });
    };

    onSubmit = () => {
        const { actions, task, checkpoint } = this.props;
        const messageObj = {
           question: this.state.value,
           task,
           checkpoint
        };
        actions.sendHelpQuestion(JSON.stringify(messageObj));
        this.handleClose();
    };

    render() {
        const { value } = this.state;

        return (
            <div className='btw-help'>
                <FontAwesome name='question-circle'
                             className='btw-help-icon'
                             onClick={this.handleClickOpen} />
                <Dialog show={this.state.open}
                        title='What is your inquiry/question about?'
                        actionButtons={
                            <Row>
                                <Col md={3}>
                                    <Button onClick={this.onSubmit}
                                            size='medium'
                                            disabled={!value}>
                                        Submit
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button onClick={this.handleClose}
                                            size='medium'>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        }
                        onClose={this.handleClose}>
                        <InputText label='Your question'
                                   autoFocus
                                   multiline
                                   rows='4'
                                   value={value}
                                   fullWidth
                                   onChange={val => this.setState({ value: val })}
                        />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ sendHelpQuestion }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HelpButton));