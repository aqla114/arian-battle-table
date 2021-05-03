import * as React from 'react';
import { InputField } from '../atoms/input-field';
import { Button } from '../atoms/button';

type Props = {
    name: string;
    value: string | number | string[];
    buttonLabel: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: any) => void;
};

export const InputFieldWithButton: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="input-field-with-button">
            <InputField
                kind="text"
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <span className="input-field-with-button__button">
                <Button name="submit-button" kind="primary" value={props.buttonLabel} onClick={props.onClick} />
            </span>
        </div>
    );
};
