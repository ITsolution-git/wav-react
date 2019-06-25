import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';
import { ChartHeader } from './index';

class PerformanceChart extends BaseComponent {

    render() {
        const { performData } = this.props;

        return (
            <div className='bcd-performance-chart btw-paper'>
                <ChartHeader performData={performData} />
            </div>
        );
    }
}

PerformanceChart.propTypes = {
    performData: PropTypes.object
};

export default PerformanceChart;