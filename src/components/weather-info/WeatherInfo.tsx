import * as React from 'react';
import moment from 'moment/moment';

export interface Props {
    className?: string;
    city: string;
    countryCode: string;
    weatherDescription: string;
}

const WeatherInfo: React.SFC<Props> = ({city, countryCode, weatherDescription, className}) => {
    return (
        <div className={className ? className : ''}>
            <div className="text-center">
                <p className="font-weight-light">{moment(new Date()).format('D MMMM YYYY')}</p>
                <p>
                    {`${city} ${countryCode}`}
                </p>
                <p className="text-capitalize">
                    {weatherDescription}
                </p>
            </div>
        </div>
    );
};

export default WeatherInfo;