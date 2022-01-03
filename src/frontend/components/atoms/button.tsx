import { FC } from 'react';

type Kind = 'primary' | 'secondary' | 'delete';

type Props = {
    name: string;
    value: string;
    kind: Kind;
    className?: string;
    onClick: (e: any) => void;
};

export const Button: FC<Props> = (props: Props) => {
    return (
        <input
            type="button"
            className={`button__${props.kind} ${props.className || ''}`}
            name={props.name}
            value={props.value}
            onClick={props.onClick}
        />
    );
};
