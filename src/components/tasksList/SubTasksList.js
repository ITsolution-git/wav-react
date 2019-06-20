import React  from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { 
    BaseComponent,
    Button,
    SocialList,
    SvgIcon,
    Typography,
    VoterAvatar 
} from '../shared';
import colors from '../../constants/Colors';

class SubTasksList extends BaseComponent {

    clickMarkAsDone = subTask => () => {
        
        if(subTask.status) {
            return;
        }

        this.props.onMarkAsDone(subTask)
    }

    render() {
        const { subTasks, status } = this.props

        return(
            subTasks.map(subTask => {
                return (
                subTask.status === status && <div className={'sub_task-item'} key={subTask.subTask_id}>
                    <div className={'voter-detail'}>
                        <VoterAvatar initials={subTask.voter.initials} src={subTask.voter.avatar} color={subTask.voter.status === 'not-registered' ? 'error' : subTask.voter.status === 'in-frequent' ? 'alert' : 'success'} />
                        <div className={'voter-general'}>
                            <Typography className={'voter-name'}>{subTask.voter.name}</Typography>
                            <div className={'voter-auth-social'}>
                                <Typography variant='functional' color={subTask.voter.status === 'not-registered' ? colors['error'] : subTask.voter.status === 'in-frequent' ? colors['alert'] : colors['success']}>{subTask.voter.status === 'not-registered' ? 'Not registerd' : subTask.voter.status === 'in-frequent' ? 'Infrequent' : 'Regular'} </Typography> | 
                                <SocialList social={subTask.voter.social}/>
                            </div>
                        </div>
                    </div>
        
                    <div className={'sub-task-info'}>
                        <SvgIcon name='medal' />
                        <Typography variant="functional">{subTask.points}</Typography>
                        { !status && <Button size='small' color='white' className={'mark-as-done'} onClick={this.clickMarkAsDone(subTask)}>Mark as Done</Button>}
                        {<SvgIcon name={status? 'mark-done' : 'mark-inprogress'} className={cn('mark-icon')} onClick={this.clickMarkAsDone(subTask)}/>}
                    </div>
                </div>
                )
            })
        )
    }
}

SubTasksList.defaultProps = {
    subTasks: [],
    status: 0,
    onMarkAsDone: () => {}
 };
 
 SubTasksList.propTypes = {
    // sub tasks object
    subTasks: PropTypes.array.isRequired,
    // sub tasts status to be redered 0: inprogress, 1: completed
    status: PropTypes.number.isRequired,
    //click mark as done button
    onMarkAsDone: PropTypes.func
     
 };
 
 export default SubTasksList;