import * as React from 'react';

import { CharacterElement } from './character-element';
import { Actions } from '../show-battle-container';
import { Button } from '../../components/button';
import { InputFieldWithButton } from '../../components/input-field-with-button';

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

    const nextActionPriority = Math.max(...props.characters.filter(x => !x.isActed).map(x => x.actionPriority));

    const characterElement = props.characters.map(character => {
        return (
            <CharacterElement
                key={character.name}
                {...character}
                isNextPrior={character.actionPriority === nextActionPriority}
                onChangeElementText={e => props.updateCharacterAttributeText({ e, name: character.name })}
                onChangeElementCheckbox={e => props.updateCharacterCheckbox({ e, name: character.name })}
                onDeleteCharacter={e => props.deleteCharacter({ e, name: character.name })}
            />
        );
    });

    return (
        <div>
            <table className="character-table">
                <thead>
                    <tr>
                        <td>行動済</td>
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
            <InputFieldWithButton
                name={'character-name'}
                value={props.currentNewCharacter.name}
                buttonLabel={'新しくキャラクターを追加'}
                placeholder={'キャラクター名'}
                onChange={e => props.updateCurrentNewCharacter(e)}
                onClick={() => props.addNewCharacter()}
            />
            <div className="save-container">
                <Button
                    name="save"
                    value="保存"
                    mode="primary"
                    onClick={() => props.saveCharacters(props.characters)}
                />
                <Button
                    name="save-newly"
                    value="新規セッションとして保存"
                    mode="primary"
                    onClick={() => props.saveCharactersNewly('test_session', props.characters)}
                />
            </div>
        </div>
    );
};
