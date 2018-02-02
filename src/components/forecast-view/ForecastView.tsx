import * as React from 'react';
import { Forecast } from '../../interfaces';
import ForecastItem from '../forecast-item/ForecastItem';

import './forecast-view.css';
import { CircularProgress } from 'material-ui/Progress';

export interface Props {
    cityId: number;
    forecast: Forecast | null;
    fetchingForecast: boolean;
}

const ForecastView: React.SFC<Props> = ({ forecast, fetchingForecast }) => {
    return (
        <div className="col-lg-6 col-sm-10 forecast-view-container">
            <div className="row no-gutters justify-content-center">
                {
                    fetchingForecast ? (
                            <div className="col-2">
                                <CircularProgress color={'primary'} />
                            </div>
                    ) :
                        forecast ? forecast.list.map((forecastItem, i) => {
                        if (i % 8 === 0) {
                            return <ForecastItem forecast={forecastItem} className="forecast-item" key={i} />;
                        } else {
                            return '';
                        }
                    }) : ''
                }
            </div>
        </div>
    );
};

export default ForecastView;