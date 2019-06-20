import React  from 'react';
import PropTypes from 'prop-types';
import ReadMoreAndLess from 'react-read-more-less';
import cn from 'classnames';
import Dropzone from 'react-dropzone';

import { 
    BaseComponent,
    Button,
    Dialog,
    SocialList,
    SvgIcon,
    Typography,
    VoterAvatar 
} from '../shared';
import colors from '../../constants/Colors';

class TaskCompleteDialog extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            markAsDoneModalStatus: 0
        }
    }

    handleFiles = files => {
        this.setState({markAsDoneModalStatus: 1},
            () => {
                var me = this;
                setTimeout(function(){
                    me.setState({markAsDoneModalStatus: 2})
                }, 1000)
            });
    }

    removePhoto = () => {
        this.setState({markAsDoneModalStatus: 0})
    }

    addATextComment = () => {
        this.setState({markAsDoneModalStatus: 3})
    }

    onClose = () => {
        this.props.onClose()
    }

    onMarkAsDone = () => {
        this.props.onMarkAsDone()
    }

    render() {

        const { showMarkAsDoneDlg, selectedTask, subTaskForMark } = this.props
        const { markAsDoneModalStatus } = this.state

        return (
            <Dialog className={cn('mark-as-done-dlg')} 
                show={showMarkAsDoneDlg} 
                closeButton 
                actionButtons={<Button fullWidth onClick={this.onMarkAsDone}>Mark as Done</Button>}
                onClose={this.onClose}> 
                
                <Typography>{selectedTask.title}</Typography>
                <ReadMoreAndLess charLimit={250}
                    readMoreText='Read more'
                    readLessText='Read less'
                >
                    {selectedTask.description}
                </ReadMoreAndLess>
                
                <div className={cn('sub_task-item', 'mark-modal-sub-task-item')}>
                    <div className={'voter-detail'}>
                        <VoterAvatar initials={subTaskForMark.voter.initials} src={subTaskForMark.voter.avatar} color={subTaskForMark.voter.status === 'not-registered' ? 'error' : subTaskForMark.voter.status === 'in-frequent' ? 'alert' : 'success'} />
                        <div className={'voter-general'}>
                            <Typography className={'voter-name'}>{subTaskForMark.voter.name}</Typography>
                            <div className={'voter-auth-social'}>
                                <Typography variant='functional' color={subTaskForMark.voter.status === 'not-registered' ? colors['error'] : subTaskForMark.voter.status === 'in-frequent' ? colors['alert'] : colors['success']}>{subTaskForMark.voter.status === 'not-registered' ? 'Not registerd' : subTaskForMark.voter.status === 'in-frequent' ? 'Infrequent' : 'Regular'} </Typography> | 
                                <SocialList social={subTaskForMark.voter.social}/>
                            </div>
                        </div>
                    </div>
                </div>

                {(markAsDoneModalStatus === 0 || markAsDoneModalStatus === 1 || markAsDoneModalStatus === 2) &&
                    <div>
                        <Typography variant="body" className={cn('add-a-photo')}>Add a photo</Typography>
                        <Typography variant="functional" lightColor>e.g. a screenshot of the person’s status changed to “registered” or their photo with the ballot. Feel free to show off with the result of your work.</Typography>
                    </div>
                }

                {markAsDoneModalStatus === 0 && <Dropzone className={cn('drop-zone')}  ref={(node) => { this.dropzoneRef = node; }} onDrop={this.handleFiles}>
                    <div className={cn('upload-photo')}>
                        <SvgIcon name="add-photo-to-upload" />
                        <Typography lightColor variant="body">Drag an image here or browse for an image to upload</Typography>
                    </div>
                </Dropzone>}

                {markAsDoneModalStatus === 1 && <div className={cn('uploading')}>
                    <Typography lightColor variant="body">Uploading...</Typography>
                </div>}

                {markAsDoneModalStatus === 2 && <div className={cn('uploaded-image')}>
                    <div className={cn('photo-info')}>
                        <SvgIcon name="uploaded-photo" />
                        <Typography variant='body' color={colors['secondary']}>dennis_photo.png</Typography>
                    </div>

                    <SvgIcon name="upload-photo-remove" className={cn('remove-btn')} onClick={this.removePhoto}/>
                </div>}

                {markAsDoneModalStatus === 0 && <div>
                    <Typography lightColor variant="body" className={cn('or-you-can')}>or you can</Typography>
                    <Typography className={cn('add-a-comment-btn')} onClick={this.addATextComment}>Add a Text Comment</Typography>
                </div>}

                {markAsDoneModalStatus === 3 &&<div className={cn('add-a-comment')}>
                    <Typography className={cn('add-text-title')}>Add a text comment</Typography>
                    <textarea placeholder='Write about your success...' className={cn('ta-write-about-your-success')}></textarea>
                </div>}

            </Dialog>
        )
    }

}

TaskCompleteDialog.defaultProps = {
    showMarkAsDoneDlg: true,
    selectedTask: {},
    subTaskForMark: {},
    onClose: () => {},
    onMarkAsDone: () => {}
 };
 
 TaskCompleteDialog.propTypes = {
    showMarkAsDoneDlg: PropTypes.bool.isRequired,
    selectedTask: PropTypes.object.isRequired, 
    subTaskForMark: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onMarkAsDone: PropTypes.func.isRequired
 };

export default TaskCompleteDialog;