import * as React from 'react';

import { CharacterElement } from './character-element';
import { AddCharacterForm } from './add-character-form';
import { Actions } from '../show-battle-container';

export type CharacterTableState = {
    sessionName: string;
    characters: CharacterProps[];
    currentNewCharacter: CharacterProps;
};

export type CharacterProps = {
    name: string;
    actionPriority: number;
    hp: number;
    maxHp: number;
    physicalDefence: number;
    magicalDefence: number;
    isKnockBack: boolean;
    isActed: boolean;
};

export function Character(
    name: string = '',
    actionPriority: number = 0,
    hp: number = 0,
    maxHp: number = 0,
    physicalDefence: number = 0,
    magicalDefence: number = 0,
): CharacterProps {
    return { name, actionPriority, hp, maxHp, physicalDefence, magicalDefence, isKnockBack: false, isActed: false };
}

type CharacterTableProps = CharacterTableState & Actions;

export const CharactersTable: React.SFC<CharacterTableProps> = (props: CharacterTableProps) => {
    React.useEffect(() => {
        props.loadCharacters();
    }, []);

    const characterElement = props.characters.map(character => (
        <CharacterElement
            key={character.name}
            {...character}
            onChangeElementText={e => props.updateCharacterAttributeText({ e, name: character.name })}
            onChangeElementCheckbox={e => props.updateCharacterIsKnockBack({ e, name: character.name })}
            onDeleteCharacter={e => props.deleteCharacter({ e, name: character.name })}
        />
    ));

    return (
        <div>
            <table className="character-table">
                <thead>
                    <tr>
                        <td />
                        <td>名前</td>
                        <td>行動値</td>
                        <td>HP</td>
                        <td>/最大HP</td>
                        <td>物理防御力</td>
                        <td>魔法防御力</td>
                        <td>ノックバック(6)</td>
                        <td>キャラクターの削除</td>
                    </tr>
                </thead>
                <tbody>{characterElement}</tbody>
            </table>
            <AddCharacterForm
                name={props.currentNewCharacter.name}
                onChangeCharacterForm={e => props.updateCurrentNewCharacter(e)}
                onClickAddCharacter={() => props.addNewCharacter()}
            />
            <div className="save-container">
                <input
                    type="button"
                    className="save-container__save-button"
                    name="save-button"
                    value="保存"
                    onClick={() => props.saveCharacters(props.characters)}
                />
                <input
                    type="button"
                    className="save-container__create-save-button"
                    name="create-save-button"
                    value="新規セッションとして保存"
                    onClick={() => props.saveCharactersNewly('test_session', props.characters)}
                />
            </div>
        </div>
    );
};
