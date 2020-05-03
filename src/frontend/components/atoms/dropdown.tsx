import * as React from 'react';

type Props = {
    value: string | number | string[];
    options: JSX.Element[];
    onChange: (e: any) => void;
};

export const Dropdown: React.SFC<Props> = (props: Props) => {
    return (
        <select className="dropdown" value={props.value} onChange={props.onChange}>
            {props.options}
        </select>
    );
};
