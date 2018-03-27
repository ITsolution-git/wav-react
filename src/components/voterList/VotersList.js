import React  from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";

import { loadVoterList } from '../../actions/VoterListAction';
import BaseComponent from '../shared/BaseComponent';


class VotersList extends BaseComponent {

    componentWillMount() {
        const { actions, voterList: { isSuccess, error } } = this.props;
        if (!isSuccess && !error) {
            actions.loadVoterList();
        }
    }

    render() {
        return (
            <div>
                Voters list page
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voterList: state.voterList
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadVoterList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotersList));