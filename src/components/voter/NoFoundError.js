import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import VoterError from './shared/VoterError';

export default class NoFoundError extends BaseComponent {
    resolveTitle = (firstName, lastName) => {
        return `We could not find ${ firstName } ${ lastName } in the voter registry.`;
    };

    render () {
        return <VoterError resolveTitle={this.resolveTitle}
                           description="Don't worry we will help get them registered"
                           {...this.props } />
    }
}