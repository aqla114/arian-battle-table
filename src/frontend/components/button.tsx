import * as React from 'react';

type Mode = 'primary' | 'delete';

type Props = {
    name: string;
    value: string;
    mode: Mode;
    onClick: (e: any) => void;
};

export const Button: React.SFC<Props> = (props: Props) => {
    return <input type="button" className={`button__${props.mode}`} {...props} />;
};
