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
import Dialog from '../shared/Dialog';
import NextButton from './shared/NextButton';
import Icon from '../shared/Icon';

class MatchList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showSuccess: false,
            showFail: false,
            showNotRegistered: false
        };
    }

    redirectToPage(voter, route) {
        const { firstname = '', lastname = ''} = voter || {};
        const fullRoute = `${route}?firstname=${firstname}&lastname=${lastname}`;
        this.onLink(fullRoute);
    }

    cantFindClick = () => {
      if (this.isDesktop()) {
          this.onLink(routes.voterNotFoundError);
          return;
      }
      this.setState({ showFail: true });
    };

    componentWillReceiveProps(props) {
        const { noResults } = props.voter;
        this.setState({ showNotRegistered: noResults });
    }

    onCloseSuccess = () => {
      this.setState({ showSuccess: false });
    };

    onCloseFail = () => {
      this.setState({ showFail: false });
    };

    onCloseRegistered = () => {
        this.setState({ showNotRegistered: false });
    };

    render() {
        const {
            boardingType,
            noResults,
            firstname,
            lastname
        } = this.props.voter;
        const {
            showSuccess,
            showFail,
            showNotRegistered
        } = this.state;

        return (
            <OnBoardingLayout>
                <div className='btw-match-list layout-center'>
                    <div>
                        <SharedMatchList
                                onSubmitSuccess={(voter) => {
                                    if (this.isDesktop()) {
                                        this.redirectToPage(voter, routes.voterSuccess);
                                        return;
                                    }
                                    this.setState({ showSuccess: true });
                                }}
                                 onSubmitError={(voter) => {
                                     if (this.isDesktop()) {
                                         this.redirectToPage(voter, routes.voterNotFoundError);
                                         return;
                                     }
                                     this.setState({ showFail: true });
                                 }} />
                        <Row id="button-row">
                            <Col id="button" md={10} xs={10} className="no-padding">
                                { boardingType === boardingTypes.register &&
                                    <Button onClick={this.cantFindClick} style={{width: '100%'}} color='red'>Can't find my friend!</Button>
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
                <Dialog show={showSuccess} onClose={this.onCloseSuccess} onHide={() => {}}>
                    <div id="match-list-mobile-dialog" className="success-modal">
                        <Icon name="" />
                    </div>
                </Dialog>
                <Dialog show={showFail} onClose={this.onCloseFail} onHide={() => {}}>
                    <div id="match-list-mobile-dialog" className="fail-modal">
                        <div className='error-icon'>
                            <Icon name='face-light' width={70} height={70} />
                        </div>
                        <div id="text" className="text-18-dark-blue">
                            It appears that your friend { firstname } <br />
                            { lastname } is not registered. Don't <br />
                            worry, we can fix that!
                        </div>
                        <NextButton onClick={this.onCloseFail} />
                    </div>
                </Dialog>
                <Dialog show={showNotRegistered} onClose={this.onCloseRegistered} onHide={() => {}}>
                    <div id="match-list-mobile-dialog" className="not-registered-modal">

                    </div>
                </Dialog>
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
