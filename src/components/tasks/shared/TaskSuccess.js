import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../../shared/BaseComponent';
import { updateTask } from '../../../actions/TaskAction';

class TaskSuccess extends BaseComponent {
    componentWillMount() {
        const { actions, data } = this.props;
        actions.updateTask(data);
    }

    render() {
        return (
            <div className='success-icon'>
                <FontAwesome name='check-circle' />
                <div className='success-text'>Task completed</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateTask }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskSuccess));