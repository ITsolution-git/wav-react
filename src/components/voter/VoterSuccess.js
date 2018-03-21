import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import NextButton from './NextButton';
import qs from "query-string";

class VoterSuccess extends BaseComponent {
    render() {
        const { search } = this.props.location || {};
        const params = qs.parse(search);
        const { firstname, lastname } = params;
        return (
            <div className='btw-voter btw-voter-error'>
                <div className="intro">
                    <p className="intro-title">
                        <div>Success</div>
                        {firstname } { lastname }
                    </p>
                </div>
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

export default connect(mapStateToProps)(withRouter(VoterSuccess));