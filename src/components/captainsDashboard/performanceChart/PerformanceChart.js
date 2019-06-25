import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../shared';
import { ChartHeader, ChartFooter } from './index';

class PerformanceChart extends BaseComponent {

    render() {
        const { performData } = this.props;

        return (
            <div className='bcd-performance-chart btw-paper'>
                <ChartHeader performData={performData} />
                <ChartFooter performData={performData} />
            </div>
        );
    }
}

PerformanceChart.propTypes = {
    performData: PropTypes.object
};

export default PerformanceChart;