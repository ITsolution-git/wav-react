import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";

import TaskBase from './shared/TaskBase';

class LiteratureVideoTask extends TaskBase {

    render() {
        return (
            <div>
                Literature video task
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LiteratureVideoTask));