import * as React from 'react';

import { CharacterProps } from './characters-table';
import { CheckBox } from '../../components/atoms/checkbox';
import { BadStatusCheckboxes } from './bad-status-checkboxes';
import { badStatusLabels, BadStatus } from '../actions/bad-status';
import { ComibnedInputField } from '../../components/molecules/combined-input-field';
import { Dropdown } from '../../components/atoms/dropdown';
import { attributeLabels } from '../actions/attribute';
import { IconButton } from '../../components/atoms/icon-button';
import { faCopy, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

type CharacterElementProps = CharacterProps & {
    isNextPrior: boolean;
    onChangeElementText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeElementCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeElementDropdown: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCopyCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    onDeleteCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    const { id, ...badStatusWithoutId } = props.badStatus;

    const badStatusList = Object.entries(badStatusWithoutId).map(([key, value]) => ({
        label: badStatusLabels[key as keyof Omit<BadStatus, 'id'>],
        name: key,
        checked: value,
        onChange: props.onChangeElementCheckbox,
    }));

    const attributeOptions = Object.entries(attributeLabels).map(([key, label]) => (
        <option value={key} key={key}>
            {label}
        </option>
    ));

    return (
        <tr className={`character-table__table__character ${props.isNextPrior ? '--next' : ''}`}>
            <td className="character-table__table__character__is-acted">
                <CheckBox name="isActed" checked={props.isActed} onChange={props.onChangeElementCheckbox} />
            </td>
            <td className="character-table__table__character__name">
                <span className="character-table__table__character__name">{props.name}</span>
            </td>
            <td className="character-table__table__character__action-priority">
                <ComibnedInputField
                    props1={{
                        name: 'actionPriority',
                        value: props.actionPriority,
                    }}
                    props2={{
                        name: 'defaultActionPriority',
                        value: props.defaultActionPriority,
                    }}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__table__character__hp">
                <ComibnedInputField
                    props1={{
                        name: 'hp',
                        value: props.hp,
                    }}
                    props2={{
                        name: 'maxHp',
                        value: props.maxHp,
                    }}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__table__character__physical-defence">
                <ComibnedInputField
                    props1={{
                        name: 'physicalDefence',
                        value: props.physicalDefence,
                    }}
                    props2={{
                        name: 'defaultPhysicalDefence',
                        value: props.defaultPhysicalDefence,
                    }}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__table__character__magical-defence">
                <ComibnedInputField
                    props1={{
                        name: 'magicalDefence',
                        value: props.magicalDefence,
                    }}
                    props2={{
                        name: 'defaultMagicalDefence',
                        value: props.defaultMagicalDefence,
                    }}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__table__character__attribute">
                <Dropdown value={props.attribute} options={attributeOptions} onChange={props.onChangeElementDropdown} />
            </td>
            <td className="character-table__table__character__badstatus">
                <BadStatusCheckboxes badStatusList={badStatusList} />
            </td>
            <td className="character-table__table__character__delete-button">
                <IconButton name="copy" icon={faCopy} onClick={props.onCopyCharacter} />
                <IconButton name="delete" icon={faTrashAlt} onClick={props.onDeleteCharacter} />
            </td>
        </tr>
    );
}
