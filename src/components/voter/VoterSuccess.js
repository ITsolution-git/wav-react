import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../shared/BaseComponent';
import NextButton from './NextButton';
import qs from "query-string";


class VoterSuccess extends BaseComponent {
    render() {
        const { search } = this.props.location || {};
        const params = qs.parse(search);
        const { firstname, lastname } = params;
        return (
            <div className='btw-voter btw-voter-success'>
                <div className="full-name">
                    {firstname } { lastname }
                </div>
                <div className='success-icon'>
                    <FontAwesome name='check-circle' />
                </div>
                <div className='registered'>Successfully registered</div>
                <div className='try-next'>Let's try 'Next' name</div>
                <div className='next-button'>
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