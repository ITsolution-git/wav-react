import React, { Component } from 'react';
import { connect } from 'react-redux';

import appDataTypes from '../../constants/AppDataTypes';


class CaptainsDashboard extends Component {
    render() {
        return (
            <div>
                Captains dashboard
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { data } = state.app[appDataTypes.profile];
    return { profile: data };
};


export default connect(mapStateToProps)(CaptainsDashboard);