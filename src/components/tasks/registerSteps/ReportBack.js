import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormLabel } from 'material-ui/Form';

import BaseComponent from '../../shared/BaseComponent';
import RadioButtons from '../../shared/inputs/RadioButtons';
import { RegisterTaskConstants } from '../../../constants/TaskConstants';

class ReportBack extends BaseComponent {
    getValues = () => {
        return [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No '},
            { value: '1', label: 'Maybe '}
        ]
    };
    render() {
        const { onChange, value = '' } = this.props;
        return (
            <div>
                <FormLabel component="legend">
                    Report back
                </FormLabel>
                <RadioButtons title='Are they registered?'
                              value={value}
                              onChange={val => onChange(RegisterTaskConstants.isRegistered, val)}
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