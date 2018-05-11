import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import { getTaskData } from "../../helpers/TaskHelper";

class AddVoterTask extends TaskBase {

    render() {
        return (
            <div>
                Add voter task
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps)
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(WithTask(AddVoterTask));