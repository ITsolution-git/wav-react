import React from 'react';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import Paper from '../shared/Paper';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import SelectDistrictItem from './SelectDistrictItem';

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
            selectedVoting: -1
        }
    }

    handleSelectDistrict = (index) => {
        this.setState({selectedVoting: index});
    }

    render() {
        const { votingDistrics, selectedVoting } = this.state;
        
        return (
            <Paper className={'select-disctrict'}>
                <h2 className={'district-title'}>Select voting district</h2>
                <Typography variant='body'>Enter your ZIP code to find a voting district you are attached to. You can change the district anytime.</Typography>

                <Typography variant='body'>The information you provided overlaps {votingDistrics.length} voting districts. Please, select one:</Typography>

                <div className={'districts-list'}>
                    {votingDistrics.map((item, index) => {

                        return (
                            <SelectDistrictItem 
                                key={index} 
                                districtName={item.title} 
                                isSelected={selectedVoting === index}
                                handleSelect={()=>this.handleSelectDistrict(index)}/>
                        );
                    })}
                </div>

                <Button disabled={selectedVoting < 0}>Next</Button>
            </Paper>
        );
    }
}

export default withRouter(SelectDistrict);