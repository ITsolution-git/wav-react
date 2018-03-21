import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import BaseComponent from '../shared/BaseComponent';
import NextButton from './NextButton';


class VoterError extends BaseComponent {
    render() {
        const { search } = this.props.location || {};
        const params = qs.parse(search);
        const { firstname, lastname } = params;

        return (
            <div className='btw-voter btw-voter-success'>
                <div>Error</div>
                { firstname } { lastname }
                <div>
                    <NextButton />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};

export default connect(mapStateToProps)(withRouter(VoterError));