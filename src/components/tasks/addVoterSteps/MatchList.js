import React from 'react';

import BaseComponent from '../../shared/BaseComponent';
import SharedMatchList from '../../shared/matchList/MatchList';
import { connect } from 'react-redux';

class MatchList extends BaseComponent {
    componentWillReceiveProps(props) {
       const { voter: { noResults }, onError } = props;
       if (noResults && !this.onChangeCalled) {
           onError(this.resolveError());
           this.onChangeCalled = true;
       }
    }


    resolveError = (notActiveStatus) => {
      const { firstname, lastname } = this.props.voter.voterDetails;
      const description = notActiveStatus
          ? <div>
              While we found { firstname } { lastname } on the voter registry, we noticed that they were not registered <br />
              Don't worry, you can help { firstname } { lastname } register in no time
            </div>
          : <div>
              While we found { firstname } { lastname } on the voter registry, we noticed that they were not registered <br />
              Don't worry, you can help { firstname } { lastname } register in no time
            </div>;

      return {
        title: `${firstname} ${lastname} may not be registered`,
        description
      }
    };


    render() {
        const { onSuccess, onError } = this.props;
        return (
            <div className='btw-match-list task-match-list' style={{ width: '93%'}}>
                <SharedMatchList onSubmitSuccess={onSuccess}
                                 fromTasks={true}
                                 onSubmitError={() => {
                                     onError(this.resolveError(true));
                                 }} />
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

