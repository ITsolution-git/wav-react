import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormLabel } from 'material-ui/Form';

import BaseComponent from '../../shared/BaseComponent';
import Dropdown from '../../shared/inputs/Dropdown';
import InputText from '../../shared/inputs/InputText';
import RadioButtons from '../../shared/inputs/RadioButtons';

class InputField extends BaseComponent {
    renderInput = () => {
        const { name } = this.props;

    };

    render() {
        return (
            <div>
                <FormLabel component="legend">
                    { this.renderInput() }
                </FormLabel>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InputField));