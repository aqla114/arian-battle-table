import { ChangeEvent, FocusEvent, FC, useEffect, useState } from 'react';

type Kind = 'number' | 'text';
type TextAlign = 'left' | 'center' | 'right';
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
    changeOnBlur?: boolean; // onBlur のタイミングで `onChange` のコールバックが呼ばれるかどうか。
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: FC<Props> = ({
    textAlign = 'left',
    showBorder = true,
    size = 'midddle',
    changeOnBlur = true,
    ...props
}: Props) => {
    const [curretntValue, setValue] = useState(props.value);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onChangeCallback = changeOnBlur
        ? (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
        : props.onChange;

    const onBlurCallback = changeOnBlur ? (e: FocusEvent<HTMLInputElement>) => props.onChange(e) : () => {};

    return (
        <input
            {...props}
            value={curretntValue}
            onChange={onChangeCallback}
            onBlur={onBlurCallback}
            type="text"
            className={`input-field__${props.kind} ${`--${textAlign}`} ${`--${size}`} ${
                showBorder ? '--show-border' : ''
            } ${props.className}`}
        />
    );
};
