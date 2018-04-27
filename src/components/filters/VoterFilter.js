import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Button } from 'react-bootstrap';
import Typography from 'material-ui/Typography';

import BaseComponent from '../shared/BaseComponent';
import { searchVoters} from '../../actions/UserSearchAction';
import UsersList from './shared/UsersList';
import {
    FirstNameInput,
    LastNameInput,
    StateInput,
    GenderInput,
    EmailInput,
    UsernameInput,
    CityInput,
    AddressInput,
    PhoneInput,
    ZipCodeInput,
    DateOfBirthInput,
    IsRegisteredInput,
    VoterStatusInput
} from './shared/FilterInputs';
import { captainFields } from './shared/SharedHelper';

const voterFields = {
        email: 'email',
        firstName: 'firstname',
        lastName: 'lastname',
        state: 'state',
        gender: 'gender',
        city: 'city',
        address: 'address',
        phone: 'phonenumber',
        isRegistered: 'isRegistered',
        voterStatus: 'voterStatus'
    },
    checkedConst = 'checked';

class VoterFilter extends BaseComponent {
    state = {
        voter: {},
        captain: {}
    };

    handleChange = (name, checked, value, isVoter = true) => {
        const type = isVoter ? 'voter' : 'captain';
        this.setState({
            [type]: {
                ...this.state[type],
                [name + checkedConst]: checked,
                [name]: value
            }
        });
    };

    onSearchClick = () => {
        let data = {
            captain: {}
        };

        const { voter, captain } = this.state;

        Object.values(voterFields).forEach(field => {
            if (voter[field + checkedConst]) {
                data[field] = voter[field];
            }
        });

        Object.values(captainFields).forEach(field => {
           if (captain[field + checkedConst]) {
               data.captain[field] = captain[field];
           }
        });
        this.loadVoterSearch(data);
    };

    loadVoterSearch = (data) => {
        this.props.actions.searchVoters(data);
    };

    componentWillMount() {
        if (this.props.userSearch.voters.length === 0) {
            this.loadVoterSearch();
        }
    }

    render() {
        const {
            voters = [],
            isFetching
        } = this.props.userSearch;
        return (
            <div className='btw-user-search container'>
                <Row>
                    <Col md={4} className='input-filters' >
                        <Typography variant='subheading' gutterBottom>
                            Voter
                        </Typography>
                        <FirstNameInput onChange={(checked, value) => this.handleChange(voterFields.firstName, checked, value )} />
                        <LastNameInput onChange={(checked, value) => this.handleChange(voterFields.lastName, checked, value )}/>
                        <EmailInput onChange={(checked, value) => this.handleChange(voterFields.email, checked, value )} />
                        <StateInput onChange={(checked, value) => this.handleChange(voterFields.state, checked, value )} />
                        <GenderInput onChange={(checked, value) => this.handleChange(voterFields.gender, checked, value )} />
                        <CityInput onChange={(checked, value) => this.handleChange(voterFields.city, checked, value )} />
                        <AddressInput onChange={(checked, value) => this.handleChange(voterFields.address, checked, value )} />
                        <PhoneInput onChange={(checked, value) => this.handleChange(voterFields.phone, checked, value )} />
                        <IsRegisteredInput onChange={(checked, value) => this.handleChange(voterFields.isRegistered, checked, value )} />
                        <VoterStatusInput onChange={(checked, value) => this.handleChange(voterFields.voterStatus, checked, value )} />
                        <Typography variant='subheading' gutterBottom>
                            Captain
                        </Typography>
                        <UsernameInput onChange={(checked, value) => this.handleChange(captainFields.username, checked, value, false )} />
                        <EmailInput onChange={(checked, value) => this.handleChange(captainFields.email, checked, value, false )} />
                        <FirstNameInput onChange={(checked, value) => this.handleChange(captainFields.firstName, checked, value, false )} />
                        <LastNameInput onChange={(checked, value) => this.handleChange(captainFields.lastName, checked, value, false )} />
                        <AddressInput onChange={(checked, value) => this.handleChange(captainFields.address, checked, value, false )} />
                        <PhoneInput onChange={(checked, value) => this.handleChange(captainFields.phone, checked, value, false )} />
                        <DateOfBirthInput onChange={(checked, value) => this.handleChange(captainFields.dateOfBirth, checked, value, false )} />
                        <ZipCodeInput onChange={(checked, value) => this.handleChange(captainFields.zipCode, checked, value, false )} />
                        <Button onClick={this.onSearchClick}>Search</Button>
                    </Col>
                    <Col md={8} className='users' >
                        <UsersList users={voters}
                                   isFetching={isFetching}
                                   isVoter={true} />
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