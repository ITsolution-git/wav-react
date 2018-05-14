import React from 'react';

import BaseComponent from '../../shared/BaseComponent';
import SharedMatchList from '../../shared/matchList/MatchList';
import { connect } from 'react-redux';

class MatchList extends BaseComponent {
    componentWillReceiveProps(props) {
       const { voter: { matchList }, onChange } = props;
       if (matchList.length === 0 && !this.onChangeCalled) {
           onChange();
           this.onChangeCalled = true;
       }
    }

    render() {
        const { onChange } = this.props;
        return (
            <div className='btw-match-list task-match-list' style={{ width: '93%'}}>
                <SharedMatchList onSubmitSuccess={onChange}
                                 onSubmitError={(voter) => {}} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};


export default connect(mapStateToProps)(MatchList);

