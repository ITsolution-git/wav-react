import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../../components/shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import { getBtwUserProfile } from "../../actions/SignOnAction";


class CaptainsDashboard extends BaseComponent {
    componentWillMount() {
        this.checkForLoadingProfile(this.props);
    }

    checkForLoadingProfile(props) {
        const { profile: { isSuccess, error }, actions } = props;
        if (!isSuccess && !error) {
            actions.getBtwUserProfile();
        }
    }

    render() {
        const { profile: { data, isSuccess } } = this.props;
        const votersCount = 27,
              level = 3,
              notificationCount = 5;

        return (
            <div className='container btw-captains-dashboard'>
                { isSuccess &&
                    <div>
                        <div className='name'>
                            { data.firstname } { data.lastname }
                        </div>
                        <div className='flex-center'>
                            <div className='blue-circle tasks flex-center'
                                 onClick={() => this.onLink(routes.tasksList)}>
                                <div className='notification'>{notificationCount}</div>
                                <div>
                                    <div className='tasks-label'>Tasks</div>
                                    <FontAwesome name='tasks'
                                                 size='4x'/>
                                </div>
                            </div>
                        </div>
                        <div className='flex-center'>
                            <div className='icons-container'>
                                <div onClick={() => this.onLink(routes.voterList)}>
                                    <div className='blue-circle link-icon flex-center'>
                                        <div>
                                            <FontAwesome name='file' size='3x' />
                                            <div className='green-text'>{ votersCount }</div>
                                        </div>
                                    </div>
                                    <span className='blue-label'>Voters</span>
                                </div>
                                <div onClick={() => this.onLink(routes.community)}>
                                    <div className='blue-circle link-icon flex-center'>
                                        <FontAwesome className='green-text' name='users' size='3x' />
                                    </div>
                                    <span className='blue-label'>Community</span>
                                </div>
                                <div className='link-icon'>
                                    <div className='grey-circle link-icon flex-center'>
                                        <FontAwesome className='blue-text' name='trophy' size='4x' />
                                        <div className='level'>{level}</div>
                                        <div className='arc'></div>
                                    </div>
                                    <span className='blue-label'> Level {level}</span>
                                </div>
                            </div>
                        </div>
                        <div className='dynamic-content flex-center'>
                            Dynamic content here
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CaptainsDashboard));