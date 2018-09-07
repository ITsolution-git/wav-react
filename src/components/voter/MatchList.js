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
import OnBoardingLayout from './shared/OnBoardingLayout';
import Button from '../shared/Button';

class MatchList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    redirectToPage(voter, route) {
        const { firstname = '', lastname = ''} = voter || {};
        const fullRoute = `${route}?firstname=${firstname}&lastname=${lastname}`;
        this.onLink(fullRoute);
    }

    onNotSureClick = () => {
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    cantFindClick = () => {
      if (this.isDesktop()) {
          this.onLink(routes.voterNotFoundError);
      }
    };

    render() {
        const { boardingType } = this.props.voter;
        return (
            <OnBoardingLayout>
                <div className='btw-match-list layout-center'>
                    <div>
                        <SharedMatchList
                                onSubmitSuccess={(voter) => {
                                    if (this.isDesktop()) {
                                        this.redirectToPage(voter, routes.voterSuccess);
                                    }
                                }}
                                 onSubmitError={(voter) => {
                                     if (this.isDesktop()) {
                                         this.redirectToPage(voter, routes.voterNotFoundError);
                                     }
                                 }} />
                        {/*<Row className='bottom-buttons'>*/}
                        {/*<Col md={12}>*/}
                        {/*<button className="btn btn-primary" onClick={this.onNotSureClick}>Add more information about my voter</button>*/}
                        {/*</Col>*/}

                        <Row>
                            <Col id="button" md={10} xs={10} className="no-padding">
                                { boardingType === boardingTypes.register &&
                                    <Button onClick={this.cantFindClick} style={{width: '100%'}} color='red'>Can't find my friend!</Button> }
                            </Col>
                        </Row>
                    </div>
                </div>
            </OnBoardingLayout>
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
