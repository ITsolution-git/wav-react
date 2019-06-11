import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from './BaseComponent';
import Button from './Button';

class VotersProgressBar extends BaseComponent {

    constructor() {
        super();
        this.state = {
            zoom: false
        }
    }

    clickHandler = () => {
        const { selectVoters, onNext } = this.props;
        selectVoters.length === 10 && onNext();
    }

    clearItemHandler = (id) => {
        this.props.onClear(id);
    }

    clearAllHandler = () => {
        const { selectVoters, onClear } = this.props;
        selectVoters.length !== 0 && onClear('all');
    }

    zoomHandler = () => {
        const { zoom } = this.state;
        const { selectVoters } = this.props;

        selectVoters.length !== 0 && this.setState({ zoom: !zoom });
    }

    votersListRender = () => {
        const { selectVoters } = this.props;
        const { zoom } = this.state;

        return (
            <Row className={classNames('voters-list-container', zoom && 'open')}>
                {
                    selectVoters.map((voter, i) => {
                        return (
                            <Col key={i} xs={12} sm={4} md={4} lg={12}>
                                <div className='item'>
                                    <div className='name'>
                                        {voter.name}
                                    </div>
                                    <span className='fa fa-close' onClick={() => this.clearItemHandler(voter.id)} />
                                </div>
                            </Col>
                        );
                    })
                }
            </Row >
        );
    }

    progressBarRender = () => {
        const { selectVoters } = this.props;

        return (
            <div className='progress-container'>
                {[...Array(10)].map((e, i) => {
                    return <div key={i} className={classNames('item', selectVoters.length > i && 'active')} />
                })}
            </div>
        );
    }

    render() {
        const { selectVoters } = this.props;
        return (
            <div className='btw-voters-progress-bar'>
                <div className='zoom-container'>
                    <div className='zoom' onClick={this.zoomHandler} />
                </div>
                <div className='status-container'>
                    <div className='status'>Added {selectVoters.length}/10:</div>
                    <a
                        className={classNames('clear', selectVoters.length !== 0 && 'active')}
                        onClick={this.clearAllHandler}>
                        Clear All
                    </a>
                </div>
                {this.progressBarRender()}
                {this.votersListRender()}
                <div className='button-container'>
                    <Button
                        onClick={this.clickHandler}
                        disabled={selectVoters.length < 10} >
                        Next Step
                    </Button>
                </div>
            </div>
        );
    }
}

VotersProgressBar.propTypes = {
    selectVoters: PropTypes.array,
    onClear: PropTypes.func,
    onNext: PropTypes.func
};

export default VotersProgressBar;
