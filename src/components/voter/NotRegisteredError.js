import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import VoterError from './shared/VoterError';

export default class NotRegisteredError extends BaseComponent {
    resolveTitle = (firstName, lastName) => {
        return `We found  ${ firstName } ${ lastName } in the registry but they are not registered to vote.`;
    };

    render () {

        return (
            <VoterError reslveTitle={this.resolveTitle}
                        description="Don't worry we will work together to help this person get registered to vote"
                        {...this.props } />
        )
    }
}