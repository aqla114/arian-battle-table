import * as React from 'react';

import { CharacterProps } from './characters-table';
import { Button } from '../../components/atoms/button';
import { InputField } from '../../components/atoms/input-field';
import { CheckBox } from '../../components/atoms/checkbox';
import { BadStatusCheckboxes } from './bad-status-checkboxes';

type CharacterElementProps = CharacterProps & {
    isNextPrior: boolean;
    onChangeElementText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeElementCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    const badStatusList = [
        {
            label: '威圧',
            name: 'overwhelmed',
            checked: props.badStatus.overwhelmed,
            onChange: props.onChangeElementCheckbox,
        },
        {
            label: 'スリップ',
            name: 'slipped',
            checked: props.badStatus.slipped,
            onChange: props.onChangeElementCheckbox,
        },
        {
            label: '放心',
            name: 'abstracted',
            checked: props.badStatus.abstracted,
            onChange: props.onChangeElementCheckbox,
        },
        {
            label: '逆上',
            name: 'frenzied',
            checked: props.badStatus.frenzied,
            onChange: props.onChangeElementCheckbox,
        },
        {
            label: 'スタン',
            name: 'stunned',
            checked: props.badStatus.stunned,
            onChange: props.onChangeElementCheckbox,
        },
        {
            label: 'ノックバック(6)',
            name: 'isKnockBack',
            checked: props.badStatus.knockback,
            onChange: props.onChangeElementCheckbox,
        },
    ];
    return (
        <tr className={`character-table__character ${props.isNextPrior ? '--next' : ''}`}>
            <td className="character-table__character__is-acted">
                <CheckBox name="isActed" checked={props.isActed} onChange={props.onChangeElementCheckbox} />
            </td>
            <td className="character-table__character__name">
                <span className="character-table__character__name">{props.name}</span>
            </td>
            <td className="character-table__character__action-priority">
                <InputField
                    kind="number"
                    name="actionPriority"
                    value={props.actionPriority}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__character__hp">
                <InputField kind="number" name="hp" value={props.hp} onChange={props.onChangeElementText} />
            </td>
            <td className="character-table__character__max-hp">
                <InputField kind="number" name="maxHp" value={props.maxHp} onChange={props.onChangeElementText} />
            </td>
            <td className="character-table__character__physical-defence">
                <InputField
                    kind="number"
                    name="physicalDefence"
                    value={props.physicalDefence}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__character__magical-defence">
                <InputField
                    kind="number"
                    name="magicalDefence"
                    value={props.magicalDefence}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td className="character-table__character__badstatus">
                <BadStatusCheckboxes badStatusList={badStatusList} />
            </td>
            <td className="character-table__character__delete-button">
                <Button name="delete" value="削除" kind="delete" onClick={props.onDeleteCharacter} />
            </td>
        </tr>
    );
}
