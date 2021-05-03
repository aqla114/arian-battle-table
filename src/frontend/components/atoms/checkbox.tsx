import * as React from 'react';

type Props = {
    name: string;
    checked: boolean;
    onChange: (e: any) => void;
};

export const CheckBox: React.FunctionComponent<Props> = (props: Props) => {
    return <input type="checkbox" className="checkbox" value="checked" {...props} />;
};
