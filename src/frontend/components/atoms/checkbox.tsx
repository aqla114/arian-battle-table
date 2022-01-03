import { FC } from 'react';

type Props = {
    name: string;
    checked: boolean;
    onChange: (e: any) => void;
};

export const CheckBox: FC<Props> = (props: Props) => {
    return <input type="checkbox" className="checkbox" value="checked" {...props} />;
};
