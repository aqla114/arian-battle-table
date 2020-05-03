import * as React from 'react';

type Kind = 'number' | 'text';

type Props = {
    name: string;
    value: string | number | string[];
    kind: Kind;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.SFC<Props> = (props: Props) => {
    return <input type="text" className={`input-field__${props.kind}`} {...props} />;
};
