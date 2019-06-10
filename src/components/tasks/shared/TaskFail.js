import React from 'react';
import PubSub from "pubsub-js";

import BaseComponent from '../../shared/BaseComponent';
import pubsubConstants from "../../../constants/PubSubConstants";
import routes from '../../../constants/Routes';
import Icon from '../../shared/Icon';

export default class TaskFail extends BaseComponent {
    componentWillMount() {
        this.taskSubscription = PubSub.subscribe(pubsubConstants.onTaskComplete, type => {
            this.onLink(routes.tasksList);
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.taskSubscription);
    }

    render() {
        const { title = 'We will have you try it again...', description } = this.props.data;
        return (
            <div className='error-icon'>
                <div className="icon">
                    <Icon name='face-light' width={90} height={90} />
                </div>
                <div className='success-text'>
                    { title }
                </div>
                <div>
                    { description }
                </div>
            </div>
        );
    }
}