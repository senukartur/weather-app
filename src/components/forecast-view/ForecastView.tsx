import * as React from 'react';
import { ForecastData } from '../../interfaces';
import ForecastItem from '../forecast-item/ForecastItem';

import './forecast-view.css';

export interface Props {
    forecastData: ForecastData;
}

const ForecastView: React.SFC<Props> = ({ forecastData }) => {
    return (
        <div className="col-lg-6 col-sm-10 forecast-view-container">
            <div className="row no-gutters">
                {forecastData.forecast ? forecastData.forecast.list.map((forecast, i) => {
                    if (i % 8 === 0) {
                        return <ForecastItem forecast={forecast} className="forecast-item" key={i} />;
                    } else {
                        return '';
                    }
                }) : ''}
            </div>
        </div>
    );
};

export default ForecastView;