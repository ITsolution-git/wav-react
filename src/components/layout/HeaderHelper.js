import React from 'react';

import gold from '../../resources/images/gold.png'
import silver from '../../resources/images/silver.png'
import bronze from '../../resources/images/bronze.png'
import wave from '../../resources/images/wave.png';

export function getLevel(data) {

    let score = (data && data.points ? data.points : 0)
    let arr = [], level = 1;

    if (score < 50) {
        arr = [null, null, bronze];
    } else if (score < 100) {
        level = 2;
        arr = [null, null, silver];
    } else if (score < 200) {
        level = 3;
        arr = [null, null, gold];
    } else if (score < 500) {
        level = 4;
        arr = [null, gold, bronze];
    } else if (score < 1000) {
        level = 5;
        arr = [null, gold, silver];
    } else if (score < 2000) {
        level = 6;
        arr = [null, gold, gold];
    } else if (score < 5000) {
        level = 7;
        arr = [gold, gold, bronze];
    } else if (score < 10000) {
        level = 8;
        arr = [gold, gold, silver];
    } else {
        level = 9;
        arr = [gold, gold, gold];
    }

    return (
        <div className="success-level tooltip">
            { arr[0] && <img src={arr[0]} width={30} height={30} alt="" /> }
            { arr[1] && <img src={arr[1]} width={30} height={30} alt="" /> }
            { arr[2] && <img src={arr[2]} width={30} height={30} alt="" /> }
            <span className="tooltiptext">Level {level} : {score} earned points</span>
        </div>
    )
}


export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function renderLogo() {
    return (
        <img src={wave} alt="" width={160} height={30} />
    )
}