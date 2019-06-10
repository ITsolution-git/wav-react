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
            showNotRegistered: false,
            notActiveStatus: false
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

    onEditInfoClick = () => {
        this.onCloseNotRegistered();
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    onCloseSuccess = () => {
      this.setState({ showSuccess: false });
    };

    onCloseFail = () => {
      this.setState({ showFail: false });
    };

    onCloseNotRegistered = () => {
        this.setState({ showNotRegistered: false });
    };

    componentWillMount() {
        const { noResults, matchList } = this.props.voter;
        this.setState({
            showNotRegistered: noResults,
            showFail: !noResults && matchList.length === 0 && this.isMobile()
        });
    }

    render() {
        const {
            boardingType,
            voterDetails: {
                firstname,
                lastname
            } = {}
        } = this.props.voter;
        const {
            showSuccess,
            showFail,
            showNotRegistered,
            notActiveStatus
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
                                         this.onLink(`${routes.voterNotFoundError}?notActiveStatus=true`);
                                         return;
                                     }
                                     this.setState({ showFail: true, notActiveStatus: true });
                                 }} />
                        <Row id="button-row">
                            <Col id="button" md={10} xs={10} className="no-padding">
                                { boardingType === boardingTypes.register &&
                                    <Button onClick={this.cantFindClick}>Can't find my friend!</Button>
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
                <Dialog show={showSuccess} onClose={this.onCloseSuccess} onHide={() => {}}>
                    <div id="match-list-mobile-dialog" className="success-modal">
                        <div className="success-icon">
                            <Icon name="check-light-blue" width={80} height={80} />
                        </div>
                        <div id="title">Awesome!</div>
                        <div id="text">
                            Your friend { firstname } { lastname } <br />
                            is registered!
                        </div>
                        <NextButton onClick={this.onCloseSuccess} />
                    </div>
                </Dialog>
                <Dialog show={showFail} onClose={this.onCloseFail} onHide={() => {}}>
                    <div id="match-list-mobile-dialog" className="fail-modal">
                        <div className='error-icon'>
                            <Icon name='face-light' width={70} height={70} />
                        </div>
                        <div id="text" className="text-15-dark-blue-bold">
                            { notActiveStatus
                                ? <div>
                                    While we found { firstname } { lastname } on the voter registry, we noticed that they were not registered <br />
                                    Don't worry, you can help { firstname } { lastname } register in no time
                                 </div>
                                : <div>
                                    It appears that your friend { firstname } <br />
                                    { lastname } is not registered. Don't <br />
                                    worry, we can fix that!
                                 </div> }
                        </div>
                        <NextButton onClick={this.onCloseFail} />
                    </div>
                </Dialog>
                <Dialog show={showNotRegistered} onClose={this.onCloseNotRegistered} onHide={() => {}}>
                    <div id="match-list-mobile-dialog" className="not-registered-modal">
                        <div id="title">
                            We can't find your friend
                        </div>
                        <div id="text" className="text-15-dark-blue-bold">
                            Is all the information you entered <br />
                            correct? If yes, don't worry.
                        </div>
                        <div id="buttons">
                            <Button onClick={this.onEditInfoClick}>Edit Info</Button>
                            <NextButton onClick={this.onCloseNotRegistered}/>
                        </div>
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
