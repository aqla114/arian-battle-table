import { FC } from 'react';

type Props = {
    value: string | number | string[];
    options: JSX.Element[];
    onChange: (e: any) => void;
    className?: string;
};

export const Dropdown: FC<Props> = (props: Props) => {
    // TODO: options、children の形式で受け取るようにする。
    return (
        <select className={`dropdown ${props.className}`} value={props.value} onChange={props.onChange}>
            {props.options}
        </select>
    );
};
