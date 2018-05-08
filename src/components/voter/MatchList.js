import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { makeListPersist, registerVoter } from "../../actions/VoterAction";
import routes from '../../constants/Routes';
import boardingTypes from '../../constants/VoterBoardingType';
import MatchItem from './shared/MatchItem';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import NextButton from './shared/NextButton';

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
        this.redirectToPage(routes.voterError);
    };

    redirectToPage(route) {
        const { firstname, lastname } = this.currentPerson;
        const fullRoute = `${route}?firstname=${firstname}&lastname=${lastname}`;
        this.onLink(fullRoute);
    }

    onNotSureClick = () => {
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    onCloseConfirmModal = () => {
        this.setState({ showConfirmModal: false });
    };

    render() {
        const { matchList, boardingType } = this.props.voter;
        const { showConfirmModal } = this.state;
        return (
            <div className='btw-voter btw-match-list'>
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
                <Row>
                    { boardingType === boardingTypes.register &&
                        <Row className='bottom-buttons'>
                            <Col xs={8} md={8}>
                                <button className="btn btn-primary" onClick={this.onNotSureClick}>Add more information about my voter</button>
                            </Col>
                            <Col xs={4} md={4}>
                                <NextButton title='Skip'/>
                            </Col>
                        </Row> }
                    { boardingType === boardingTypes.voterList &&
                        <Row className='bottom-buttons'>
                            <Col>
                                <button className="btn btn-primary" onClick={() => this.onLink(routes.voterList)}>Cancel</button>
                            </Col>
                        </Row> }
                </Row>
                <ConfirmationDialog show={showConfirmModal}
                                    title='Register voter'
                                    description='Are you sure this is the voter you intend to add to your list?'
                                    submitText='Yes'
                                    onSubmit={() => {
                                        this.props.actions.registerVoter(this.currentPerson);
                                        this.redirectToPage(routes.voterSuccess);
                                        this.onCloseConfirmModal();
                                    } }
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
    actions: bindActionCreators({ makeListPersist, registerVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MatchList));