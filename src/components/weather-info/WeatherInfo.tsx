import * as React from 'react';

export interface Props {
    city: string;
    countryCode: string;
    weatherDescription: string;
}

const WeatherInfo: React.SFC<Props> = ({city, countryCode, weatherDescription}) => {
    return (
        <div className={'info'}>
            <p>
                {`${city} ${countryCode}`}
            </p>
            <p style={{textTransform: 'capitalize'}}>
                {weatherDescription}
            </p>
        </div>
    );
};

export default WeatherInfo;