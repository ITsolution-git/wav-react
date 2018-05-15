import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import BaseComponent from '../BaseComponent';
import { registerVoter } from '../../../actions/VoterAction';
import MatchItem from './MatchItem';
import ConfirmationDialog from '../ConfirmationDialog';

class MatchList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showConfirmModal: false
        };
    }

    onNameClick = (person) => {
        this.currentPerson = person;
        if (person.voterstatus === 'active') {
            this.setState({ showConfirmModal: true });
            return;
        }
        this.onSubmitError(this.currentPerson);
    };

    onCloseConfirmModal = () => {
        this.setState({ showConfirmModal: false });
    };

    onSubmitSuccess = () => {
        const { onSubmitSuccess, actions } = this.props;
        actions.registerVoter(this.currentPerson);
        this.onCloseConfirmModal();
        onSubmitSuccess(this.currentPerson);
    };

    onSubmitError = () => {
        this.props.onSubmitError(this.currentPerson);
    };

    render() {
        const { matchList } = this.props.voter;
        const { showConfirmModal } = this.state;
        return (
            <div>
                <div className="intro">
                    <p className="intro-title">
                        { matchList.length > 1 ?
                            'Is one of these people your friend?' :
                            matchList.length === 1 ?
                                'Is this your friend?' :
                                'Our search returned no results'
                        }
                    </p>
                    <p className="intro-title">
                        { matchList.length ? "Click on the name of your voter to select it" : "" }
                    </p>
                </div>
                <div className='match-list'>
                    { matchList.sort((person1, person2) => person2.matchRate - person1.matchRate)
                        .map((person, i) => <MatchItem key={i}
                                                       onClick={() => this.onNameClick(person)}
                                                       person={person} />
                        )}
                </div>
                <ConfirmationDialog show={showConfirmModal}
                                    title='Register voter'
                                    description='Are you sure this is the voter you intend to add to your list?'
                                    submitText='Yes'
                                    onSubmit={this.onSubmitSuccess}
                                    onClose={this.onCloseConfirmModal} />
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
    actions: bindActionCreators({ registerVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MatchList));