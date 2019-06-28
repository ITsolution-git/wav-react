import React from 'react';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../../shared/BaseComponent';
import Paper from '../../shared/Paper';
import Typography from '../../shared/Typography';
import Button from '../../shared/Button';
import Autocomplete from '../../shared/Autocomplete';
import SelectDistrictItem from './SelectDistrictItem';
import routes from '../../../constants/Routes';
import './styles/index.scss';

class SelectDistrict extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
           votingDistrics: [
               {title: "illinois's Congresssional District #1"},
               {title: "illinois's Congresssional District #2"},
               {title: "illinois's Congresssional District #3"},
               {title: "illinois's Congresssional District #4"},
               {title: "illinois's Congresssional District #5"},
               {title: "illinois's Congresssional District #5"},
               {title: "illinois's Congresssional District #5"},
               {title: "illinois's Congresssional District #5"}
            ],
            selectedVoting: -1,
            searchAutoItems: [
                {id: 0, label: "Area 0"},
                {id: 1, label: "Area 1"},
                {id: 2, label: "Area 2"},
                {id: 3, label: "Area 3"},
                {id: 4, label: "Area 4"},
                {id: 5, label: "Area 5"},
            ],
            searchString: ""
        }
    }

    handleSelectDistrict = index => () => {
        this.setState({selectedVoting: index});
    };

    getDistricts = (value, item) => {
        this.setState({
            votingDistrics: [
                {title: "illinois's Congresssional District #1"},
                {title: "illinois's Congresssional District #2"},
                {title: "illinois's Congresssional District #3"}
            ],
            searchString: value.label
        });
    };

    onNextClick = () => {
      this.onLink(routes.selectVoters);
    };

    render() {
        const { votingDistrics, selectedVoting, searchAutoItems, searchString } = this.state;
        
        return (
            <Paper className={'select-disctrict'}>
                <Typography>Select voting district</Typography>
                {
                    !searchString && <Typography variant='body'>Enter your ZIP code to find a voting district you are attached to. You can change the district anytime.</Typography>
                }

                <Autocomplete items={searchAutoItems}
                    onSelect={this.getDistricts}
                    value={searchString}
                    className={'search-box'} />

                {
                    searchString && <Typography variant='body'>The information you provided overlaps {votingDistrics.length} voting districts. Please, select one:</Typography>
                }

                <div className={'districts-list'}>
                    {votingDistrics.map((item, index) => {

                        return (
                            <SelectDistrictItem 
                                key={index} 
                                districtName={item.title} 
                                isSelected={selectedVoting === index}
                                handleSelect={this.handleSelectDistrict(index)}/>
                        );
                    })}
                </div>

                <Button onClick={this.onNextClick} disabled={selectedVoting < 0}>Next</Button>
            </Paper>
        );
    }
}

export default withRouter(SelectDistrict);