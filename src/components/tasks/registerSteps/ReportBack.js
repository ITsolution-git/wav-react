import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormLabel } from 'material-ui/Form';

import BaseComponent from '../../shared/BaseComponent';
import RadioButtons from '../../shared/RadioButtons';

class ReportBack extends BaseComponent {
    getValues = () => {
        return [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No '},
            { value: 'maybe', label: 'Maybe '}
        ]
    };
    render() {
        return (
            <div>
                <FormLabel component="legend">
                    Report back
                </FormLabel>
                <RadioButtons title='Are they registered?'
                              values={ this.getValues() } />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReportBack));