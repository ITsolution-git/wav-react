import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import { BaseComponent, Button, Dialog, SvgIcon, Typography, SubTaskItem } from '../index';
import colors from '../../../constants/Colors';

class TaskCompleteDialog extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            file: '',
            comment: '',
            isImageUpload: true,
            isLoading: false,
            markAsDoneModalStatus: 0
        }
    }

    showVoterProfileHandler = () => { }

    inputChangeHandler = (event) => {
        this.setState({ comment: event.target.value });
    }

    inputPhotoHandler = files => {
        const file = files[0];
        this.setState({ isLoading: true });
        // TODO: implement upload phoro logic
        this.setState({ file: file.name });
        this.setState({ isLoading: false });
    }

    switchCommentHandler = () => {
        this.setState({ isImageUpload: false });
    }

    removePhotoHandler = () => {
        this.setState({ file: '' })
    }

    onMarkAsDone = () => {
        this.props.onMarkAsDone()
    }

    renderActionButton = () => {
        return (
            <Button fullWidth onClick={this.onMarkAsDone}>Mark as Done</Button>
        );
    }

    renderSubTaskInfo = () => {
        const { selectedTask, selectedSubTask } = this.props

        return (
            <div className='task-info'>
                <Typography variant='body' fontWeight='600' className='title'>
                    {`Task ${selectedTask.task_id}: ${selectedTask.title}`}
                </Typography>
                <Typography variant='body' lightColor className='description-part'>
                    Communicate and encourage Dennis Holfman to register for voting.
                </Typography>
                <Typography variant='body' lightColor className='view-profile-part'>
                    To find out some personalised tips on how to communicate your
                    purpose to this particular voter better,
                    <span onClick={this.showVoterProfileHandler}>view voter’s profile</span>.
                </Typography>
                <SubTaskItem subTask={selectedSubTask} hideSubTask />
            </div>
        )
    }

    renderContentHeader = () => {
        const { isImageUpload, comment } = this.state;

        return (
            <div className='content-header'>
                <Typography variant='body' fontWeight='600' className='title'>
                    {isImageUpload ? 'Add a photo' : 'Add a text comment'}
                </Typography>
                {isImageUpload ?
                    <Typography variant='functional' lightColor>
                        e.g. a screenshot of the person’s status changed
                        to “registered” or their photo with the ballot.
                        Feel free to show off with the result of your work.
                    </Typography> :
                    <textarea
                        placeholder='Write about your success...'
                        value={comment}
                        onChange={this.inputChangeHandler}
                        className={classNames({ 'textarea-active': !!comment })}></textarea>
                }
            </div>
        )
    }

    renderImageUpload = () => {
        const { isImageUpload, isLoading, file } = this.state;

        if (isImageUpload) {
            if (!file) {
                return isLoading ?
                    <Typography lightColor variant='body' className='uploading-text'>Uploading...</Typography> :
                    <Dropzone
                        className='drop-zone'
                        ref={(node) => { this.dropzoneRef = node; }}
                        onDrop={this.inputPhotoHandler}>
                        <div className='upload-photo'>
                            <SvgIcon name='add-photo-to-upload' />
                            <Typography variant='body' className='upload-text'>Upload Photo</Typography>
                        </div>
                    </Dropzone>
            } else {
                return (
                    <div className='uploaded-image'>
                        <div className='photo-info'>
                            <SvgIcon name='uploaded-photo' />
                            <Typography variant='body' color={colors['secondary']}>{file}</Typography>
                        </div>
                        <SvgIcon name='upload-photo-remove' className='remove-btn' onClick={this.removePhotoHandler} />
                    </div>
                )
            }
        }
    }

    renderContentFooter = () => {
        const { isImageUpload, file } = this.state;

        if (isImageUpload && !file) {
            return (
                <>
                    <Typography lightColor variant='body' className='or-you-can'>or you can</Typography>
                    <Typography
                        variant='body'
                        fontWeight='600'
                        className='add-a-comment-btn'
                        onClick={this.switchCommentHandler}>
                        Add a Text Comment
                    </Typography>
                </>
            );
        }
    }

    render() {
        const { show, onClose } = this.props;

        return (
            <Dialog className='btw-task-complete-dialog'
                show={show}
                closeButton
                actionButtons={this.renderActionButton()}
                onClose={onClose}>
                {this.renderSubTaskInfo()}
                {this.renderContentHeader()}
                {this.renderImageUpload()}
                {this.renderContentFooter()}
            </Dialog>
        )
    }
}

TaskCompleteDialog.propTypes = {
    show: PropTypes.bool,
    selectedTask: PropTypes.object,
    selectedSubTask: PropTypes.object,
    onClose: PropTypes.func,
    onMarkAsDone: PropTypes.func
};

TaskCompleteDialog.defaultProps = {
    show: true,
    selectedTask: {},
    selectedSubTask: {},
    onClose: () => { },
    onMarkAsDone: () => { }
};

export default TaskCompleteDialog;