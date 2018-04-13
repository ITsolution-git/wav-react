import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';
import FontAwesome from 'react-fontawesome';

import InputText from '../../shared/inputs/InputText';

import BaseComponent from '../../shared/BaseComponent';
import { getTaskData } from "../../../helpers/TaskHelper";

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
        this.setState({ open: false });
    };

    render() {
        const { value } = this.state;
        const { taskData = {}, checkpoint = '' } = this.props;
        console.log(this.props);
        return (
            <div>
                <FontAwesome name='question-circle'
                             className='btw-help'
                             onClick={this.handleClickOpen} />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <DialogContentText>
                            Task: {  }
                        </DialogContentText>
                        <DialogContentText>
                            Checkpoint: { checkpoint }
                        </DialogContentText>
                        <InputText label='Your question'
                                   autoFocus
                                   multiline
                                   rows='4'
                                   value={value}
                                   fullWidth
                                   margin='normal'
                                   onChange={val => this.setState({ value: val })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
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
    console.log(ownProps);
    return {
        taskData: getTaskData(state, ownProps)
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HelpButton));