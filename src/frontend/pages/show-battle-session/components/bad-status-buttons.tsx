import { TextCheckBox } from '../../../components/atoms/text-checkbox';
import * as uuid from 'uuid';
import { ButtonDropdown, OnClickDropdownListItem } from '../../../components/atoms/button-dropdown';
import { ChangeEvent, FC, Fragment } from 'react';

export type BadStatusButtonsProps = {
    badStatusList: BadStatusProps[];
};

export type BadStatusProps = BooleanBadStatus | NumberBadStatus;

export type BadStatusType = 'boolean' | 'number';

type BooleanBadStatus = {
    label: string;
    name: string;
    value: boolean;
    statusType: 'boolean';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type NumberBadStatus = {
    label: string;
    name: string;
    value: number;
    statusType: 'number';
    onClick: OnClickDropdownListItem;
};

const BADSTATUS_STRENGTH_OPTIONS = [...Array(40).keys()];

export const BadStatusButtons: FC<BadStatusButtonsProps> = (props: BadStatusButtonsProps) => {
    return (
        <Fragment>
            {props.badStatusList.map(prop => {
                if (prop.statusType === 'number') {
                    return (
                        <ButtonDropdown
                            key={uuid.v4()}
                            name={prop.name}
                            label={prop.label}
                            options={BADSTATUS_STRENGTH_OPTIONS}
                            value={prop.value}
                            onClick={prop.onClick}
                        />
                    );
                } else if (prop.statusType === 'boolean') {
                    return (
                        <TextCheckBox
                            key={uuid.v4()}
                            label={prop.label}
                            name={prop.name}
                            checked={prop.value}
                            onChange={prop.onChange}
                        />
                    );
                }
            })}
        </Fragment>
    );
};
