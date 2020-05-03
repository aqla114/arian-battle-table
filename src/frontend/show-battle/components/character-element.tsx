import * as React from 'react';

import { CharacterProps } from './characters-table';
import { Button } from '../../components/button';

type CharacterElementProps = CharacterProps & {
    isNextPrior: boolean;
    onChangeElementText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeElementCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteCharacter: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    return (
        <tr className={`character-table__character${props.isNextPrior ? '--next' : ''}`}>
            <td>
                <input
                    type="checkbox"
                    className="character-table__character__acted"
                    name={'isActed'}
                    value={'checked'}
                    checked={props.isActed}
                    onChange={props.onChangeElementCheckbox}
                />
            </td>
            <td>
                <span className="character-table__character__name">{props.name}</span>
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__action-priority"
                    name={'actionPriority'}
                    value={props.actionPriority}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__hp"
                    name={'hp'}
                    value={props.hp}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__max-hp"
                    name={'maxHp'}
                    value={props.maxHp}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__physical-defence"
                    name={'physicalDefence'}
                    value={props.physicalDefence}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__magical-defence"
                    name={'magicalDefence'}
                    value={props.magicalDefence}
                    onChange={props.onChangeElementText}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    className="character-table__character__knock-back"
                    name={'isKnockBack'}
                    value={'checked'}
                    checked={props.isKnockBack}
                    onChange={props.onChangeElementCheckbox}
                />
            </td>
            <td>
                <Button name="delete" value="削除" mode="delete" onClick={props.onDeleteCharacter} />
            </td>
        </tr>
    );
}
