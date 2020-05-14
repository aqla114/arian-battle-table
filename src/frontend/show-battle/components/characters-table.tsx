import * as React from 'react';

import { CharacterElement } from './character-element';
import { Actions } from '../show-battle-container';
import { Button } from '../../components/atoms/button';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { Dialog } from '../../components/molecules/dialog';
import { BadStatus, defaultBadStatus } from '../actions/bad-status';
import { CardContainer } from '../../components/card-container';

export type CharacterTableState = {
    sessionName: string;
    characters: CharacterProps[];
    currentNewCharacter: CharacterProps;
    deleteCharacterName: string;
    isModalOpen: boolean;
};

export type CharacterProps = {
    name: string;
    defaultActionPriority: number;
    actionPriority: number;
    hp: number;
    maxHp: number;
    physicalDefence: number;
    magicalDefence: number;
    badStatus: BadStatus;
    isActed: boolean;
};

export function Character(
    name: string = '',
    actionPriority: number = 0,
    defaultActionPriority: number = 0,
    hp: number = 0,
    maxHp: number = 0,
    physicalDefence: number = 0,
    magicalDefence: number = 0,
): CharacterProps {
    const badStatus = defaultBadStatus;
    return {
        name,
        defaultActionPriority,
        actionPriority,
        hp,
        maxHp,
        physicalDefence,
        magicalDefence,
        badStatus,
        isActed: false,
    };
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
                onDeleteCharacter={e => props.openDeletionModal({ e, name: character.name })}
            />
        );
    });

    return (
        <div>
            {props.isModalOpen ? (
                <Dialog
                    description={'本当に削除しますか？'}
                    enterLabel={'削除する'}
                    cancelLabel={'キャンセル'}
                    onClickEnter={() => props.deleteCharacter()}
                    onClickCancel={() => props.closeDeletionModal()}
                />
            ) : null}
            <div className="save-container">
                <span className="save-container__save-button">
                    <Button
                        name="save"
                        value="保存"
                        kind="primary"
                        onClick={() => props.saveCharacters(props.characters)}
                    />
                </span>
                <span className="save-container__save-newly-button">
                    <Button
                        name="save-newly"
                        value="新規セッションとして保存"
                        kind="primary"
                        onClick={() => props.saveCharactersNewly('test_session', props.characters)}
                    />
                </span>
            </div>
            <CardContainer>
                <table className="character-table__table">
                    <thead>
                        <tr>
                            <td>行動済</td>
                            <td>名前</td>
                            <td>行動値 / 元</td>
                            <td>HP / 最大HP</td>
                            <td>物理防御力</td>
                            <td>魔法防御力</td>
                            <td>バッドステータス</td>
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
            </CardContainer>
        </div>
    );
};
