import React from 'react';
import classNames from 'classnames';
import { Button as MuiButton } from '@material-ui/core';

export default class Button extends React.Component {

    render() {
        const {
            children,
            size='large',
            style = {},
            disabled,
            id,
            color = 'blue',
            borderEnabled = false,
            onClick = () => {}
        } = this.props;

        return (
            <MuiButton>
                    id={id}
                    style={style}
                    disabled={disabled}
                    onClick={onClick}>
                { children }
            </MuiButton>
        )
    }
}