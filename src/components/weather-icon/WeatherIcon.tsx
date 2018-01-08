import * as React from 'react';

export interface Props {
    iconId: number;
}
const WeatherIcon: React.SFC<Props> = ({ iconId }) => {
    return (
        <div className={'icon'}>
            <i className={`wi wi-owm-${iconId}`}></i>
        </div>
    );
};

export default WeatherIcon;