import * as React from 'react';

type Kind = 'primary' | 'secondary' | 'delete';

type Props = {
    name: string;
    value: string;
    kind: Kind;
    onClick: (e: any) => void;
};

export const Button: React.FunctionComponent<Props> = (props: Props) => {
    return <input type="button" className={`button__${props.kind}`} {...props} />;
};
