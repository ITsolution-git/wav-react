import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Button } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { searchVoters} from '../../actions/UserSearchAction';
import UsersList from './shared/UsersList';
import {
    FirstNameInput,
    LastNameInput
} from './shared/FilterInputs';


class VoterFilter extends BaseComponent {

    render() {
        const { voters = [] } = this.props.userSearch;
        return (
            <div className='btw-user-search container'>
                <Row>
                    <Col md={7} className='users' >
                        <UsersList />
                    </Col>
                    <Col md={5} className='input-filters' >
                        <FirstNameInput />
                        <LastNameInput />
                        <Button>Search</Button>
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
    actions: bindActionCreators({ searchVoters }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VoterFilter);