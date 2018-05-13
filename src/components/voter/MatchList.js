import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { registerVoter } from "../../actions/VoterAction";
import routes from '../../constants/Routes';
import boardingTypes from '../../constants/VoterBoardingType';
import SharedMatchList from '../shared/matchList/MatchList';
import NextButton from './shared/NextButton';

class MatchList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    redirectToPage(voter, route) {
        const { firstname, lastname } = voter;
        const fullRoute = `${route}?firstname=${firstname}&lastname=${lastname}`;
        this.onLink(fullRoute);
    }

    onNotSureClick = () => {
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    render() {
        const { matchList, boardingType } = this.props.voter;
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
                <SharedMatchList onSubmitSuccess={(voter) => {
                                    this.redirectToPage(voter, routes.voterSuccess);
                                 }}
                                 onSubmitError={(voter) => {
                                     this.redirectToPage(voter, routes.voterError);
                                 }} />
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