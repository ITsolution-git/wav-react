import React from 'react';

import BaseComponent from '../../shared/BaseComponent';

export default class AskVoter extends BaseComponent {
    renderBool = (value) => {
      return value ? "Yes" : "No"
    };

    render() {
        const {
            voterData: {
                firstname = '',
                lastname = ''
            },
            stateInfo = {}
        } = this.props;

        return (
            <div>
                <div>
                    Ask { firstname } { lastname } how they prefer to cast their ballot, and be ready to give them more information about their options…
                    <br /><br />
                    Vote by mail: <b>{ this.renderBool(stateInfo['voteByMail'])}</b><br />
                    deadline to request absentee ballot <b>{ stateInfo["absoluteAbsenteeBallotApplicationDeadline"]}</b><br />
                    Early voting in person: <b>{ this.renderBool(stateInfo['earlyVoting'])}</b>
                </div>
            </div>
        );
    }
}
