import * as React from 'react';

export type ButtonDropdownValue = string | number;
type Options = Array<ButtonDropdownValue>;

type Props = {
    name: string;
    label: string;
    value: ButtonDropdownValue;
    options: Options;
    onClick: OnClickDropdownListItem;
};

export const ButtonDropdown: React.FunctionComponent<Props> = (props: Props) => {
    const [open, toggleOpen] = React.useState(false);

    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            open && toggleOpen(false);
        };

        document.addEventListener('click', handler);

        return () => document.removeEventListener('click', handler);
    });

    return (
        <div className="button-dropdown">
            <button
                className={`button-dropdown__button ${Boolean(props.value) ? '--active' : ''}`}
                onClick={() => toggleOpen(!open)}
            >{`${props.label}`}</button>
            {open && (
                <DropdownOptions
                    options={props.options}
                    dropdownKey={props.name}
                    onClickListItem={(key, value) => props.onClick(key, value)}
                />
            )}
        </div>
    );
};

export type OnClickDropdownListItem = (key: string, value: ButtonDropdownValue) => void;

const DropdownOptions: React.FunctionComponent<{
    options: Options;
    dropdownKey: string;
    onClickListItem: OnClickDropdownListItem;
}> = ({ options, dropdownKey, onClickListItem }) => {
    return (
        <ul className="dropdown-list">
            {options.map(option => (
                <li
                    className="dropdown-list__item"
                    key={option.toString()}
                    onClick={_ => onClickListItem(dropdownKey, option)}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
};
