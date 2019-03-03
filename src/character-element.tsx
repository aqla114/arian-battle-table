import * as React from 'react';

import { CharacterProps } from './main';

type CharacterElementProps = CharacterProps & {
    onElementChange: (e: any) => void;
};

export function CharacterElement(props: CharacterElementProps) {
    return (
        <tr className="character-table__character">
            <td>
                {props.name}
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__action-priority"
                    name={'actionPriority'}
                    value={props.actionPriority}
                    onChange={props.onElementChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__hp"
                    name={'hp'}
                    value={props.hp}
                    onChange={props.onElementChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__physical-defence"
                    name={'physicalDefence'}
                    value={props.physicalDefence}
                    onChange={props.onElementChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="character-table__character__magical-defence"
                    name={'magicalDefence'}
                    value={props.magicalDefence}
                    onChange={props.onElementChange}
                />
            </td>
        </tr>
    );
}