import * as React from 'react';

type Kind = 'number' | 'text';
type TextAlign = 'left' | 'right';

type Props = {
    name: string;
    value: string | number | string[];
    kind: Kind;
    className?: string;
    showBorder?: boolean;
    textAlign?: TextAlign;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.SFC<Props> = ({ textAlign = 'left', showBorder = true, ...props }: Props) => {
    const [curretntValue, setValue] = React.useState(props.value);
    React.useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <input
            {...props}
            value={curretntValue}
            onChange={e => setValue(e.target.value)}
            onBlur={e => props.onChange(e)}
            type="text"
            className={`input-field__${props.kind} ${`--${textAlign}`} ${showBorder ? '--show-border' : ''} ${
                props.className
            }`}
        />
    );
};
