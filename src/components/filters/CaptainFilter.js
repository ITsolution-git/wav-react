import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Button } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { searchCaptains } from '../../actions/UserSearchAction';
import UsersList from './shared/UsersList';
import {
    FirstNameInput,
    LastNameInput,
    EmailInput,
    UsernameInput,
    AddressInput,
    PhoneInput,
    ZipCodeInput,
    DateOfBirthInput
} from './shared/FilterInputs';
import { captainFields } from './shared/SharedHelper';

const checkedConst = 'checked';


class CaptainFilter extends BaseComponent {

    handleChange = (name, checked, value) => {
        this.setState({
            [name + checkedConst]: checked,
            [name]: value
        })
    };

    onSearchClick = () => {
        let data = {};
        Object.values(captainFields).forEach(field => {
           if (this.state[field + checkedConst]) {
               data[field] = this.state[field];
           }
        });
        this.loadCaptainSearch(data);
    };

    loadCaptainSearch = (data) => {
        this.props.actions.searchCaptains(data);
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
                    <Col md={4} className='input-filters' >
                        <UsernameInput onChange={(checked, value) => this.handleChange(captainFields.username, checked, value)} />
                        <EmailInput onChange={(checked, value) => this.handleChange(captainFields.email, checked, value)} />
                        <FirstNameInput onChange={(checked, value) => this.handleChange(captainFields.firstName, checked, value)} />
                        <LastNameInput onChange={(checked, value) => this.handleChange(captainFields.lastName, checked, value)} />
                        <AddressInput onChange={(checked, value) => this.handleChange(captainFields.address, checked, value)} />
                        <PhoneInput onChange={(checked, value) => this.handleChange(captainFields.phone, checked, value)} />
                        <DateOfBirthInput onChange={(checked, value) => this.handleChange(captainFields.dateOfBirth, checked, value)} />
                        <ZipCodeInput onChange={(checked, value) => this.handleChange(captainFields.zipCode, checked, value)} />
                        <Button onClick={this.onSearchClick}>Search</Button>
                    </Col>
                    <Col md={8} className='users' >
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