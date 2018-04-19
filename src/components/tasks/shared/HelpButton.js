import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from 'material-ui/Dialog';
import FontAwesome from 'react-fontawesome';

import InputText from '../../shared/inputs/InputText';
import BaseComponent from '../../shared/BaseComponent';
import { sendHelpQuestion } from '../../../actions/TaskAction';

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
                <Dialog open={this.state.open}
                    onClose={this.handleClose}>
                    <DialogTitle>What is your inquiry/question about?</DialogTitle>
                    <DialogContent>
                        <InputText label='Your question'
                                   autoFocus
                                   multiline
                                   rows='4'
                                   value={value}
                                   fullWidth
                                   onChange={val => this.setState({ value: val })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onSubmit}
                                disabled={!value}>
                            Submit
                        </Button>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
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