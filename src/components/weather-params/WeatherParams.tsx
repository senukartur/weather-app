import * as React from 'react';
import Tooltip from 'material-ui/Tooltip';
import { Wind, WeatherParams } from '../../interfaces';
export interface Props {
    wind: Wind;
    weatherParams: WeatherParams;
}

const WeatherParams: React.SFC<Props> = ({wind, weatherParams}) => {
    return (
        <React.Fragment>
            <div className="col-3">
                <Tooltip title="Wind direction" placement="top">
                    <div>
                        <i className={`wi wi-wind from-${Math.floor(wind.deg)}-deg`}/>
                        <span className="font-weight-light">
                                    {wind.deg > 179 ? Math.floor(wind.deg - 180) : Math.floor(wind.deg + 180)}
                                </span>
                        <i className="wi wi-degrees" />
                    </div>
                </Tooltip>
            </div>
            <div className="col-3">
                <Tooltip title="Wind speed" placement="top">
                    <div>
                        <i className="wi wi-strong-wind" />
                        <span className="font-weight-light"> {wind.speed}  m/s</span>
                    </div>
                </Tooltip>
            </div>
            <div className="col-3">
                <Tooltip title="Pressure" placement="top">
                    <div>
                        <i className="wi wi-barometer" />
                        <span className="font-weight-light"> {weatherParams.pressure}  hPa</span>
                    </div>
                </Tooltip>
            </div>
            <div className="col-3">
                <Tooltip title="Humidity" placement="top">
                    <div>
                        <i className="wi wi-humidity" />
                        <span className="font-weight-light"> {weatherParams.humidity} %</span>
                    </div>
                </Tooltip>
            </div>
        </React.Fragment>
    );
};

export default WeatherParams;