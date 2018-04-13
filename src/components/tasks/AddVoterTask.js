import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";

import TaskBase from './shared/TaskBase';

class AddVoterTask extends TaskBase {

    render() {
        return (
            <div>
                Add voter task
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddVoterTask));