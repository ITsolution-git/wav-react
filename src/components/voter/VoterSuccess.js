import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import BaseComponent from '../shared/BaseComponent';
import { makeListPersist } from "../../actions/VoterAction";
import routes from '../../constants/Routes';

class VoterError extends BaseComponent {
    render() {
        const { matchList } = this.props.voter;
        return (
            <div className='btw-voter btw-voter-error'>
                voter success
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ makeListPersist }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterError));