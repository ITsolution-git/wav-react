import React from 'react';

import BaseComponent from '../shared/BaseComponent';

const Task = (TaskComponent) => {
    return class WithTask extends BaseComponent {
        componentWillMount() {
            window.onbeforeunload = function (e) {
                const dialogText = `Are sure you want to reload? After refreshing the page you will be redirected back to the 'Task List' page and all progress will be lost`;
                return dialogText;
            };
            if (!this.props.taskData) {
                // this.onLink(routes.tasksList);
            }
        }

        componentWillUnmount() {
            window.onbeforeunload = null;
        }

        render() {
            return <TaskComponent {...this.props} />;
        }
    };
};

export default Task;