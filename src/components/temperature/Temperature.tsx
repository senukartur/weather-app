import * as React from 'react';

export interface Props {
    temperature: number;
}

const Temperature: React.SFC<Props> = ({ temperature }) => {
    return (
        <div className={'temperature'}>
            <span>{Math.floor(temperature)}</span><i className="wi wi-degrees"></i>
        </div>
    );
};

export default Temperature;
