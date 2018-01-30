import * as React from 'react';

export interface Props {
    temperature: number;
    className?: string;
}

const Temperature: React.SFC<Props> = ({ temperature, className }) => {
    return (
        <div className={className ? className : ''}>
            <p className="text-center">
                <span>{Math.floor(temperature)}</span>
                <i className="wi wi-degrees" />
            </p>
        </div>
    );
};

export default Temperature;
