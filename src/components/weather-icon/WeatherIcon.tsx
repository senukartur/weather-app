import * as React from 'react';

export interface Props {
    iconId: number;
    className?: string;
}
const WeatherIcon: React.SFC<Props> = ({ iconId, className }) => {
    return (
        <div className={ className ? className : ''}>
            <i className={`wi wi-owm-${iconId}`}></i>
        </div>
    );
};

export default WeatherIcon;