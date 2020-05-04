import * as React from 'react';
import * as uuid from 'uuid';

type Props = {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: any) => void;
};

export const TextCheckBox: React.SFC<Props> = (props: Props) => {
    const id = uuid.v4();
    return (
        <React.Fragment>
            <input type="checkbox" className="text-checkbox" value="checked" id={id} {...props} />
            <label htmlFor={id} className="text-checkbox">
                {props.label}
            </label>
        </React.Fragment>
    );
};
