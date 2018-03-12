import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import appDataTypes from '../../constants/AppDataTypes';
import { getBtwUserProfile } from "../../actions/SignOnAction";


class CaptainsDashboard extends Component {
    componentWillMount() {
        const { profile: { isSuccess, error }, actions } = this.props;
        if (!isSuccess && !error) {
            actions.getBtwUserProfile();
        }
    }

    render() {
        const { profile: { data, isSuccess } } = this.props;
        return (
            <div className='container'>
                { isSuccess &&
                    <div>
                        <div>{data.firstname} {data.lastname}</div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    return { profile };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getBtwUserProfile }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaptainsDashboard);