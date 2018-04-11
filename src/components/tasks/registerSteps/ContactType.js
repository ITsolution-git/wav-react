import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormLabel } from 'material-ui/Form';

import BaseComponent from '../../shared/BaseComponent';
import appDataTypes from '../../../constants/AppDataTypes';
import RadioButtons from '../../shared/inputs/RadioButtons';

class ContactType extends BaseComponent {
    getValues = () => {
      return [
          { value: 'phone', label: 'Phone' },
          { value: 'email', label: 'Email '}
      ]
    };
    render() {
        const { data } = this.props.currentUser;
        return (
            <div>
                <FormLabel component="legend">
                    Hi { data.firstname } for today, we will need you to reach out to Peter Mccain to see if they are registered to vote
                </FormLabel>
                <RadioButtons title='How did you contact them?'
                              values={ this.getValues() } />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.app[appDataTypes.profile]
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactType));