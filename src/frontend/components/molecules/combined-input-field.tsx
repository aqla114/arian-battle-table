import * as React from 'react';
import { InputField } from '../atoms/input-field';

type Props = {
    props1: {
        name: string;
        value: string | number | string[];
        placeholder?: string;
    };
    props2: {
        name: string;
        value: string | number | string[];
        placeholder?: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ComibnedInputField: React.SFC<Props> = (props: Props) => {
    return (
        <div className="combined-input-field">
            <InputField
                kind="number"
                name={props.props1.name}
                value={props.props1.value}
                onChange={props.onChange}
                textAlign={'right'}
            />
            <span> / </span>
            <InputField kind="number" name={props.props2.name} value={props.props2.value} onChange={props.onChange} />
        </div>
    );
};
