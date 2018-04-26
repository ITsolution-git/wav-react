import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Button } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { searchCaptains } from '../../actions/UserSearchAction';
import UsersList from './shared/UsersList';
import {
    FirstNameInput,
    LastNameInput
} from './shared/FilterInputs';


class CaptainFilter extends BaseComponent {
    state ={
        firstNameChecked: false,
        firstName: ''
    };

    handleChange = (name, value) => {

    };

    onSearchClick = () => {
        this.loadCaptainSearch();
    };

    loadCaptainSearch = () => {
        this.props.actions.searchCaptains();
    };

    componentWillMount() {
        if (this.props.userSearch.captains.length === 0) {
            this.loadCaptainSearch();
        }
    }

    render() {
        const {
            captains = [],
            isFetching
        } = this.props.userSearch;
        return (
            <div className='btw-user-search container'>
                <Row>
                    <Col md={5} className='input-filters' >
                        <FirstNameInput />
                        <LastNameInput />
                        <Button onClick={this.onSearchClick}>Search</Button>
                    </Col>
                    <Col md={7} className='users' >
                        <UsersList users={captains}
                                   isFetching={isFetching}
                                   isVoter={false} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userSearch: state.userSearch
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ searchCaptains }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptainFilter);