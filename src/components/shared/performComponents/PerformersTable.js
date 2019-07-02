import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import classNames from 'classnames';

import { BaseComponent, SvgIcon, Typography } from '../index';
import { PerformerInfo, PerformerRank } from './index';

class PerformersTable extends BaseComponent {

    renderDesktopHeader = () => {
        return (
            <tr>
                <th className='rank-content'>Rank</th>
                <th>Captain</th>
                <th className='score-content'>Tasks done</th>
                <th className='score-content'>Points earned</th>
            </tr>
        );
    }

    renderStatusItem = (value, isPoint = true) => {
        return (
            <Typography variant='body' fontWeight='600'>
                <SvgIcon name={isPoint ? 'medal' : 'action-status-completed'} className='status-icon' />
                {value}
            </Typography>
        );
    }

    renderDesktopBody = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <tr key={i} className={classNames('desktop-body')}>
                    <td>
                        <PerformerRank performer={item} rank={i + 1} />
                    </td>
                    <td>
                        <PerformerInfo
                            name={`${item.firstName} ${item.lastName}`}
                            level={item.level} />
                    </td>
                    <td>
                        {this.renderStatusItem(item.points)}
                    </td>
                    <td>
                        {this.renderStatusItem(item.activeTasks, false)}
                    </td>
                </tr>
            );
        })
    }

    renderMobileBody = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <tr key={i} className={classNames('mobile-body')}>
                    <td className='rank-content'>
                        <PerformerRank performer={item} rank={i + 1} />
                    </td>
                    <td>
                        <PerformerInfo
                            name={`${item.firstName} ${item.lastName}`}
                            level={item.level} />
                    </td>
                    <td>
                        <div className='status-content'>
                            {this.renderStatusItem(item.points)}
                            {this.renderStatusItem(item.activeTasks, false)}
                        </div>
                    </td>
                </tr>
            );
        })
    }

    render() {
        const { className } = this.props;

        return (
            <div className={classNames('btw-performers-table', className)}>
                <Table responsive>
                    <thead className='desktop-header'>
                        {this.renderDesktopHeader()}
                    </thead>
                    <tbody>
                        {this.renderDesktopBody()}
                        {this.renderMobileBody()}
                    </tbody>
                </Table >
            </div >
        );
    }
}

PerformersTable.propTypes = {
    data: PropTypes.array,
    selectedData: PropTypes.array,
    onSelect: PropTypes.func
};

PerformersTable.defaultProps = {
    maxSelectedVoters: 10
}

export default PerformersTable;
