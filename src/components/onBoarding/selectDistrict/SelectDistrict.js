import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import routes from '../../../constants/Routes';
import { BaseComponent, Button, Typography, AutoComplete } from '../../shared'
import { SelectDistrictItem } from './index';
import './styles/index.scss';

class SelectDistrict extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            votingDistrics: [],
            selectedVoting: null,
            searchAutoItems: [
                { id: 0, label: "Chicago, IL" },
                { id: 1, label: "Chicago, PL" },
                { id: 2, label: "Los IL" },
                { id: 3, label: "New York PL" },
                { id: 4, label: "Califonia FL" },
                { id: 5, label: "Califonia CL" },
            ],
            searchString: ""
        }
    }

    getDistricts = (value, item) => {
        let data = [];
        if (!!value.label) {
            data = [
                { id: 0, title: "illinois's Congresssional District #1" },
                { id: 1, title: "illinois's Congresssional District #2" },
                { id: 2, title: "illinois's Congresssional District #3" },
                { id: 3, title: "illinois's Congresssional District #4" },
                { id: 4, title: "illinois's Congresssional District #5" },
                { id: 5, title: "illinois's Congresssional District #6" }
            ];
        }

        this.setState({
            votingDistrics: data,
            searchString: value.label
        });
    };

    selectDistrictHandler = id => () => {
        this.setState({ selectedVoting: id });
    };

    onNextHandler = () => {
        this.onLink(routes.selectVoters);
    };

    renderDistrictList = () => {
        const { votingDistrics, selectedVoting } = this.state;

        return (
            <div className={'districts-list'}>
                {votingDistrics.map((disctrict, index) => (
                    <SelectDistrictItem
                        key={index}
                        district={disctrict}
                        isSelected={disctrict.id === selectedVoting}
                        onSelect={this.selectDistrictHandler(disctrict.id)} />)
                )}
            </div>
        )
    }

    renderSearchDescription = () => {
        const { searchString } = this.state;

        if (!searchString) {
            return (
                <Typography variant='body' lightColor className='description'>
                    Enter your ZIP code to find a voting district you are
                    attached to. You can change the district anytime.
                </Typography>
            )
        }
    }

    renderSearchResult = () => {
        const { votingDistrics, selectedVoting, searchString } = this.state;

        if (!!searchString) {
            return (
                <>
                    <Typography variant='body' lightColor className='description-result'>
                        The information you provided overlaps {votingDistrics.length}
                        voting districts. Please, select one:
                    </Typography>
                    {this.renderDistrictList()}
                    <div className='button-content'>
                        <Button fullWidth disabled={selectedVoting < 0} onClick={this.onNextHandler}>
                            Next
                        </Button>
                    </div>
                </>
            )
        }
    }

    render() {
        const { searchAutoItems, searchString } = this.state;

        return (
            <Container className='btw-paper btw-select-disctrict'>
                <Typography className='title'>Select voting district</Typography>
                {this.renderSearchDescription()}
                <AutoComplete
                    items={searchAutoItems}
                    onSelect={this.getDistricts}
                    value={searchString}
                    className='search-box'
                    placeholder='Search by ZIP, Address, City' />
                {this.renderSearchResult()}
            </Container>
        );
    }
}

export default withRouter(SelectDistrict);