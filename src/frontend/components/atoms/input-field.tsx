import * as React from 'react';

type Kind = 'number' | 'text';
type TextAlign = 'left' | 'right';

type Props = {
    name: string;
    value: string | number | string[];
    kind: Kind;
    showBorder?: boolean;
    textAlign?: TextAlign;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.SFC<Props> = ({ textAlign = 'left', showBorder = true, ...props }: Props) => {
    return (
        <input
            type="text"
            className={`input-field__${props.kind} ${`--${textAlign}`} ${showBorder ? '--show-border' : ''}`}
            {...props}
        />
    );
};
