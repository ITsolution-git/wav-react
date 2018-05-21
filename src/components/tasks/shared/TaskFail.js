import React from 'react';
import FontAwesome from 'react-fontawesome';
import PubSub from "pubsub-js";

import BaseComponent from '../../shared/BaseComponent';
import pubsubConstants from "../../../constants/PubSubConstants";
import routes from '../../../constants/Routes';

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
        return (
            <div className='error-icon'>
                <FontAwesome name='exclamation-triangle' />
                <div className='success-text'>We will have you try it again...</div>
            </div>
        );
    }
}