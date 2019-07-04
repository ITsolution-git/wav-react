import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { BaseComponent, ProfileDropdown } from '../../shared';
import { btwLogout } from '../../../actions/AuthActions';
import routes from '../../../constants/Routes';
import appDataTypes from "../../../constants/AppDataTypes";

class HeaderProfileDropdown extends BaseComponent {
    goToSettings = () => {
        this.onLink(routes.profile)
    };

    handleLogout = () => {
        const { actions: { btwLogout } } = this.props;
        btwLogout();
    };

    render() {
        const { profile: {data} } = this.props;
        const props={...this, ...data};

        return (
            <div className='btw-header-dropdown'>
                <ProfileDropdown btwLogout={this.handleLogout}
                                 btwSettings={this.goToSettings}
                                 {...props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    return {
        profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ btwLogout }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderProfileDropdown));