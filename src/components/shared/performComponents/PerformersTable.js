import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import classNames from 'classnames';

import { BaseComponent, SvgIcon } from '../index';
import { PerformerInfo } from './index';

class PerformersTable extends BaseComponent {

    renderDesktopHeader = () => {
        return (
            <tr>
                <th className='rank-header'>Rank</th>
                <th className='captain-header'>Captain</th>
                <th className='score-header'>Tasks done</th>
                <th className='score-header'>Points earned</th>
            </tr>
        );
    }

    renderPerformerInfo = (item) => {
        return (
            <>
                <div className='name'>
                    {item.name}
                </div>
                <div className='description'>
                    {`${item.sex} | ${item.street}`}
                </div>
            </>
        );
    }

    renderDesktopBody = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <tr key={i} className={classNames('desktop-body')}>
                    <td>
                        {item.id}
                    </td>
                    <td>
                        <PerformerInfo
                            name={`${item.firstName} ${item.lastName}`}
                            level={item.level} />
                    </td>
                    <td>
                        <SvgIcon name='medal' className='status-icon' />
                        {item.points}
                    </td>
                    <td>
                        <SvgIcon name='action-status-completed' className='status-icon' />
                        {item.activeTasks}
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
