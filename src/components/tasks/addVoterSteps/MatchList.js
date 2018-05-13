import React from 'react';

import BaseComponent from '../../shared/BaseComponent';
import SharedMatchList from '../../shared/matchList/MatchList';

export default class MatchList extends BaseComponent {

    render() {
        return (
            <div className='btw-match-list' style={{ width: '93%'}}>
                <SharedMatchList onSubmitSuccess={(voter) => {
                    this.props.onChange(voter);
                }}
                 onSubmitError={(voter) => {}} />
            </div>
        );
    }
}