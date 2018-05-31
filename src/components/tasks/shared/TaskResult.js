import React from 'react';

import TaskSuccess from './TaskSuccess';
import TaskFail from './TaskFail';

export default function (isSuccess = true, data) {
    return {
        label: isSuccess ? 'Success' : 'Fail',
        component: isSuccess ? <TaskSuccess data={data} /> : <TaskFail />,
        valid: true
    };
}