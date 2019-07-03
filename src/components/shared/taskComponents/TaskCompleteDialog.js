import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Button, Dialog, Typography, StatusIcon, VoterAvatar, SocialList } from '../index';
import { CommentItem, CommentEditor } from './index';

class TaskCompleteDialog extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentComment: {
                text: '',
                images: []
            }
        }
    }

    showVoterProfileHandler = () => { }

    inputChangeHandler = (event) => {
        this.setState({ comment: event.target.value });
    }

    onMarkAsDone = () => {
        this.props.onMarkAsDone()
    }

    onAddComment = currentComment => {
        this.setState({ currentComment });
    }

    onCancelComment = () => {
        this.setState({ currentComment: { text: '', images: [] } });
    }

    renderActionButton = () => {
        return (
            <Button fullWidth onClick={this.onMarkAsDone}>Mark as Done</Button>
        );
    }

    renderVoter = () => {
        const { selectedSubTask: { voter } } = this.props

        return (
            <div className='voter-content'>
                <VoterAvatar
                    src={voter.src}
                    firstName={voter.firstName}
                    lastName={voter.lastName}
                    status={voter.status} />
                <div className='voter-info'>
                    <Typography variant='body' fontWeight='600'>
                        {voter.firstName} {voter.lastName}
                    </Typography>
                    <Typography variant='functional' lightColor>
                        {`${voter.sex} | ${voter.lastName}`}
                    </Typography>
                    <div className='voter-status'>
                        <StatusIcon type={voter.status} className='social-icon' />
                        <SocialList social={voter.social} showVoterFile />
                    </div>
                </div>
            </div >
        )
    }

    renderSubTaskInfo = () => {
        return (
            <div className='task-info'>
                <Typography variant='body' lightColor className='description-part'>
                    Communicate and encourage Dennis Holfman to register for voting.
                </Typography>
                <Typography variant='body' lightColor className='view-profile-part'>
                    To find out some personalised tips on how to communicate your
                    purpose to this particular voter better,
                    <span onClick={this.showVoterProfileHandler}>view voter’s profile</span>.
                </Typography>
                {this.renderVoter()}
            </div>
        )
    }

    renderComments = () => {
        const { selectedSubTask: { comments, voter } } = this.props;
        const { currentComment } = this.state;

        return (
            <div className='comments-content'>
                <Typography variant='body' fontWeight='600' className='title'>
                    {`Updates (${comments.length})`}
                </Typography>
                {comments.map((comment, index) => (
                    <CommentItem key={index} comment={comment} voter={voter} onEdit={this.onAddComment} />
                ))}
                <CommentEditor
                    voter={voter}
                    comment={currentComment}
                    onCancel={this.onCancelComment}
                    onAdd={this.onAddComment} />
            </div>
        )
    }

    render() {
        const { show, onClose, selectedTask } = this.props;

        return (
            <Dialog className='btw-task-complete-dialog'
                show={show}
                title={`Task ${selectedTask.task_id}: ${selectedTask.title}`}
                closeButton
                actionButtons={this.renderActionButton()}
                onClose={onClose}>
                {this.renderSubTaskInfo()}
                {this.renderComments()}
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