import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import routes from '../../../constants/Routes';
import { getDistrictByAddress, selectDistrict } from '../../../actions/DistrictListActions';
import { BaseComponent, Button, Typography, AutoComplete, Spinner } from '../../shared'
import { SelectDistrictItem } from './index';
import './styles/index.scss';

class SelectDistrict extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedDistrict: {},
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
        if (!!value.label) {
            this.props.actions.getDistrictByAddress(value.label)
        }
        this.setState({
            searchString: value.label
        });
    };

    selectDistrictHandler = district => () => {
        this.setState({ selectedDistrict: district });
    };

    onNextHandler = () => {
        this.props.actions.selectDistrict(this.state.selectedDistrict)
        this.onLink(routes.selectVoters);
    };

    renderDistrictList = () => {
        const { districts } = this.props
        const { selectedDistrict } = this.state;

        return (
            <div className={'districts-list'}>
                {districts.map((item, index) => (
                    <SelectDistrictItem
                        key={index}
                        district={item}
                        isSelected={item._id === selectedDistrict._id}
                        onSelect={this.selectDistrictHandler(item)} />)
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
        const { districts } = this.props
        const { selectedDistrict, searchString } = this.state;

        if (!!searchString) {
            return (
                <>
                    <Typography variant='body' lightColor className='description-result'>
                        The information you provided overlaps {districts.length} voting districts. Please, select one:
                    </Typography>
                    {this.renderDistrictList()}
                    <div className='button-content'>
                        <Button fullWidth disabled={selectedDistrict < 0} onClick={this.onNextHandler}>
                            Next
                        </Button>
                    </div>
                </>
            )
        }
    }

    render() {
        const { isFetching } = this.props;
        const { searchAutoItems, searchString } = this.state;

        return (
            <Container className='btw-paper btw-select-disctrict'>
                <Spinner loading={isFetching} />

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

const mapStateToProps = (state) => {
    const { error, districts, isSuccess, isFetching } = state.districtList;
    return {
        error,
        districts,
        isFetching,
        isSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getDistrictByAddress, selectDistrict }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectDistrict));