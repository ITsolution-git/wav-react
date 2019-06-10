import React from 'react';
import PubSub from "pubsub-js";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import BaseComponent from '../../shared/BaseComponent';
import Spinner from '../../shared/Spinner';
import { updateTask } from '../../../actions/TaskAction';
import pubsubConstants from "../../../constants/PubSubConstants";
import appDataTypes from '../../../constants/AppDataTypes';
import Icon from '../../shared/Icon';

class TaskSuccess extends BaseComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskComplete, type => {
            const { actions, data } = this.props;
            if (data.formData) {
                actions.updateTask(data.formData, true);
                return;
            }
            actions.updateTask(data);
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.taskSubscription);
    }

    render() {
        const { taskRequest: { isFetching }, title = 'Task completed...' } = this.props;
        return (
            <div className='success-icon'>
                <div className="icon">
                    <Icon name="check-light-blue" width={70} height={70} />
                </div>
                <div className='success-text'>
                    { title }
                </div>
                <Spinner height={100} loading={isFetching} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskRequest: state.app[appDataTypes.updateTask] || {}
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateTask }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskSuccess));