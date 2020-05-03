import * as React from 'react';
import { InputField } from './input-field';
import { Button } from './button';

type Props = {
    name: string;
    value: string | number | string[];
    buttonLabel: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: any) => void;
};

export const InputFieldWithButton: React.SFC<Props> = (props: Props) => {
    return (
        <div className="input-field-with-button">
            <InputField
                kind="text"
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <Button name="submit-button" mode="primary" value={props.buttonLabel} onClick={props.onClick} />
        </div>
    );
};
