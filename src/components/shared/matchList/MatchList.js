import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import { registerVoter } from '../../../actions/VoterAction';
import MatchItem from './MatchItem';
import Dialog from '../Dialog';
import Spinner from '../Spinner';
import Paginator from '../Paginator';
import Button from '../../shared/Button';

class MatchList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showConfirmModal: false,
            currentVoters: [],
            expandedId: null,
            fullInfo: ''
        };
    }

    onNameClick = (person) => {
        this.currentPerson = person;
        this.setState({ showConfirmModal: true });
    };

    onClose = () => {
        this.setState({ showConfirmModal: false });
    };

    onSubmitSuccess = () => {
        if (this.currentPerson.voterstatus !== 'active') {
            this.onSubmitError(this.currentPerson);
            return;
        }
        const { onSubmitSuccess, actions } = this.props;
        actions.registerVoter(this.currentPerson);
        this.onClose();
        onSubmitSuccess(this.currentPerson);
    };

    onSubmitError = () => {
        this.props.onSubmitError(this.currentPerson);
    };

    getViewProps = () => {
      const { fromTasks } = this.props;
      if (this.isDesktop() && !fromTasks) {
        return {
            titleClass: '',
            dialogTitle: ''
        }
      }
      return {
          titleClass: '',
          dialogTitle: ''
      }
    };

    render() {
        const { matchList, matchListFetching } = this.props.voter;
        const {
            showConfirmModal,
            currentVoters,
            expandedId,
            fullInfo
        } = this.state;
        const { firstname, lastname } = this.currentPerson || {};
        const items = matchList.sort((person1, person2) => person2.matchRate - person1.matchRate);
        const viewProps = this.getViewProps();

        return (
            <div>
                <Spinner loading={matchListFetching} height={200} />
                { !matchListFetching &&
                    <div id="title" className={viewProps.titleClass}>
                        { matchList.length > 1 ?
                            'Which one is your friend?' :
                            matchList.length === 1 ?
                                'Is this your friend?' :
                                'Our search returned no results'
                        }
                    </div> }
                <div className='match-list'>
                    { currentVoters.map((person, i) => {
                        return <MatchItem key={i} id={'currentVoter' + i}
                                          onClick={info => {
                                              this.onNameClick(person);
                                              this.setState({ fullInfo: info });
                                          }}
                                          onChange={id => this.setState({ expandedId: id })}
                                          expanded={person.dwid === expandedId}
                                          person={person}/>
                    })}
                </div>
                <Paginator items={items}
                           onItemsChange={items => this.setState({ currentVoters: items })}/>
                <Dialog show={showConfirmModal} onClose={this.onClose}>
                    <div id="match-list-modal-content">
                        <div id="text">
                            <div className={viewProps.dialogTitle}>
                                Are you sure this is your friend?</div>
                            <div id="info" className="text-15-dark-blue-bold">
                                { firstname } { lastname }
                                <div>{ fullInfo }</div>
                            </div>
                        </div>
                        <Row id="buttons">
                            <Col md={6} xs={12} mdPush={3}>
                                <Button onClick={this.onClose}>No</Button>
                            </Col>
                            <Col md={6} xs={12}>
                                <Button onClick={this.onSubmitSuccess}>Yes</Button>
                            </Col>
                        </Row>
                    </div>
                </Dialog>
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
