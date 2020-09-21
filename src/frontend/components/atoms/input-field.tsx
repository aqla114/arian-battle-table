import * as React from 'react';

type Kind = 'number' | 'text';
type TextAlign = 'left' | 'right';
type Size = 'small' | 'midddle' | 'large';

type Props = {
    name: string;
    value: string | number | string[];
    kind: Kind;
    className?: string;
    showBorder?: boolean;
    textAlign?: TextAlign;
    placeholder?: string;
    size?: Size;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.SFC<Props> = ({
    textAlign = 'left',
    showBorder = true,
    size = 'midddle',
    ...props
}: Props) => {
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
            className={`input-field__${props.kind} ${`--${textAlign}`} ${`--${size}`} ${
                showBorder ? '--show-border' : ''
            } ${props.className}`}
        />
    );
};
