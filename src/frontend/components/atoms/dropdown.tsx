import * as React from 'react';

type Props = {
    value: string | number | string[];
    onChange: (e: any) => void;
    className?: string;
};

export const Dropdown: React.FC<Props> = props => {
    return (
        <select className={`dropdown ${props.className}`} value={props.value} onChange={props.onChange}>
            {props.children}
        </select>
    );
};
