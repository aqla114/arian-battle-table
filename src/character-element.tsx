import * as React from 'react';

import { CharacterProps } from './main';

type CharacterElementProps = CharacterProps & {
    onChangeElement: (e: any) => void;
    onDeleteCharacter: (e: any) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    return (
        <tr className="character-table__character">
            <td>
                <span className="character-table__character__name">{props.name}</span>
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__action-priority"
                    name={'actionPriority'}
                    value={props.actionPriority}
                    onChange={props.onChangeElement}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__hp"
                    name={'hp'}
                    value={props.hp}
                    onChange={props.onChangeElement}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__physical-defence"
                    name={'physicalDefence'}
                    value={props.physicalDefence}
                    onChange={props.onChangeElement}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__magical-defence"
                    name={'magicalDefence'}
                    value={props.magicalDefence}
                    onChange={props.onChangeElement}
                />
            </td>
            <td>
                <input
                    type="button"
                    className="character-table__character__delete-button"
                    name={'delete'}
                    value={'削除'}
                    onClick={props.onDeleteCharacter}
                />
            </td>
        </tr>
    );
}
