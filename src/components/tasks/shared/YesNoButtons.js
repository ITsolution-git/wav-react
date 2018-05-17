import React from 'react';
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';
import RadioButtons from '../../shared/inputs/RadioButtons';

const options = {
    yes: 'yes',
    no: 'no'
};

export default class YesNoButtons extends BaseComponent {
    getValues = () => {
        return [
            { value: options.yes, label: 'Yes' },
            { value: options.no, label: 'No'}
        ]
    };

    render() {
        const {
            title = '',
            onChange,
            value = ''
        } = this.props;

        return (
            <div>
                <Typography gutterBottom>
                    { title }
                </Typography>
                <RadioButtons title=''
                              onChange={onChange}
                              value={value}
                              values={ this.getValues() } />
            </div>
        );
    }
};

