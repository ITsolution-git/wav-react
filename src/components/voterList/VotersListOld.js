import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Col } from 'react-bootstrap';

import { loadVoterList, addVoter } from '../../actions/VoterListAction';
import BaseComponent from '../shared/BaseComponent';
import VoterItem from './VoterItem';
import AddEditDialog from './AddEditDialog';
import Spinner from '../shared/Spinner';
import Paginator from '../shared/Paginator';
import ContentLayout from '../layout/ContentLayout';
import Icon from '../shared/Icon';
import { getUrlParam } from '../../helpers/UrlHelper';

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
        if (getUrlParam(this.props, 'openAddModal')) {
            setTimeout(() => {
                this.setState({showAddDialog: true});
            }, 400);
        }
    }
    

    closeAddModal = () => {
        this.setState({ showAddDialog: false });
    };

    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                titleClass: ''
            }
        }
        return {
            titleClass: ''
        }
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

        const viewProps = this.getViewProps();

        return (
            <ContentLayout>
                <div className='btw-voter-list container'>
                    <Spinner height={300} loading={isFetching} />
                    <Col>
                        <div className={viewProps.titleClass}>My Voters</div>
                    </Col>
                    { this.isDesktop() &&
                        <Col className="pull-right" onClick={() => this.setState({ showAddDialog: true })}>
                            <div id="add-button">
                                Add Voter <Icon name="plus" width={20} height={20} />
                            </div>
                        </Col> }
                    <Col md={12} className='voters-list'>
                        { currentVoters.map(voter => <VoterItem key={voter._id} voter={voter} />)}
                        <Paginator items={voters}
                                   onItemsChange={items => this.setState({ currentVoters: items })}/>
                    </Col>
                    { this.isMobile() &&
                    <Col onClick={() => this.setState({ showAddDialog: true })}>
                        <div id="add-button-mobile">
                            <Icon name="plus-white" width={25} height={25} /> Add Voter
                        </div>
                    </Col> }
                    <AddEditDialog show={showAddDialog}
                                   title='Add'
                                   onAdd={data => {
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
