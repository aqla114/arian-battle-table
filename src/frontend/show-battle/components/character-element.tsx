import * as React from 'react';

import { CharacterProps } from './characters-table';
import { Button } from '../../components/atoms/button';
import { InputField } from '../../components/atoms/input-field';
import { CheckBox } from '../../components/atoms/checkbox';
import { TextCheckBox } from '../../components/atoms/text-checkbox';

type CharacterElementProps = CharacterProps & {
    isNextPrior: boolean;
    onChangeElementText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeElementCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    return (
        <tr className={`character-table__character ${props.isNextPrior ? '--next' : ''}`}>
            <td>
                <CheckBox name="isActed" checked={props.isActed} onChange={props.onChangeElementCheckbox} />
            </td>
            <td>
                <span className="character-table__character__name">{props.name}</span>
            </td>
            <td>
                <InputField
                    kind="number"
                    name="actionPriority"
                    value={props.actionPriority}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <InputField kind="number" name="hp" value={props.hp} onChange={props.onChangeElementText} />
            </td>
            <td>
                <InputField kind="number" name="maxHp" value={props.maxHp} onChange={props.onChangeElementText} />
            </td>
            <td>
                <InputField
                    kind="number"
                    name="physicalDefence"
                    value={props.physicalDefence}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <InputField
                    kind="number"
                    name="magicalDefence"
                    value={props.magicalDefence}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <TextCheckBox
                    label="ノックバック"
                    name="isKnockBack"
                    checked={props.isKnockBack}
                    onChange={props.onChangeElementCheckbox}
                />
            </td>
            <td>
                <Button name="delete" value="削除" kind="delete" onClick={props.onDeleteCharacter} />
            </td>
        </tr>
    );
}
