import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import TaskBase from './shared/TaskBase';
import Stepper from './shared/LetfStepper';
import { getTaskData } from '../../helpers/TaskHelper';

class UpdateProfileTask extends TaskBase {

    getSteps = () => {
        const { captain_metaData, voter_metaData = {} } = this.props.taskData || {};
        const fields = captain_metaData
            ? captain_metaData
            : voter_metaData.fields;

        return fields.map(field => {
            return {
                label: field.capitalize(),
                component: null
            }
          });
    };

    render() {
        return (
            <div className='btw-task container'>
                <Stepper steps={this.getSteps()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateProfileTask));