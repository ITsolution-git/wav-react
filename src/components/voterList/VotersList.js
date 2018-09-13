import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import { loadVoterList, addVoter } from '../../actions/VoterListAction';
import BaseComponent from '../shared/BaseComponent';
import VoterItem from './VoterItem';
import AddEditDialog from './AddEditDialog';
import Spinner from '../shared/Spinner';
import Paginator from '../shared/Paginator';
import Button from '../shared/Button';
import ContentLayout from '../layout/ContentLayout';
import Icon from '../shared/Icon';

class VotersList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
          showAddDialog: false,
          currentVoters: []
        };
    }

    componentWillMount() {
        const { actions, voterList: { isSuccess, error } } = this.props;
        if (!isSuccess && !error) {
            actions.loadVoterList();
        }
    }

    closeAddModal = () => {
        this.setState({ showAddDialog: false });
    };

    render() {
        const {
            showAddDialog,
            currentVoters
        } = this.state;
        const { voterList: {
            voters = [],
            isFetching
        }} = this.props;
        return (
            <ContentLayout>
                <div className='btw-voter-list container'>
                    <Spinner height={300} loading={isFetching} />
                    <Col>
                        <div className="title-24-blue">My Voters</div>
                    </Col>
                    <Col className="pull-right" onClick={() => this.setState({ showAddDialog: true })}>
                        <div id="add-button">
                            Add Voter <Icon name="plus" width={20} height={20} />
                        </div>
                    </Col>
                    <Col md={12} className='voters-list'>
                        { currentVoters.map((voter, i) => <VoterItem key={i} voter={voter} />)}
                    </Col>
                    <Paginator items={voters}
                               onItemsChange={items => this.setState({ currentVoters: items })}/>
                    <AddEditDialog show={showAddDialog}
                                   title='Add Voter'
                                   submitText='Add'
                                   onSubmit={data => {
                                       this.props.actions.addVoter(data);
                                       this.closeAddModal();
                                   } }
                                   onClose={this.closeAddModal} />
                </div>
            </ContentLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voterList: state.voterList
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadVoterList, addVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotersList));
