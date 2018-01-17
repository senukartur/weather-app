import * as React from 'react';

interface Props {
    onClick: () => void;
}

const Button: React.SFC<Props> = ({ onClick, children }) => {
    return (
        <button onClick={onClick}>{children}</button>
    );
};

export default Button;