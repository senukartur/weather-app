import * as React from 'react';

export interface Props {
    iconId: number;
    className?: string;
}
const WeatherIcon: React.SFC<Props> = ({ iconId, className }) => {
    return (
        <div className={className ? className : ''}>
            <p className="text-center">
                <i className={`wi wi-owm-${iconId}`} />
            </p>
        </div>
    );
};

export default WeatherIcon;