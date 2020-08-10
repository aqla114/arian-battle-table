import * as React from 'react';

import { CharacterElement } from './character-element';
import { Actions } from '../show-battle-container';
import { Button } from '../../components/atoms/button';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { Dialog } from '../../components/molecules/dialog';
import { BadStatus, defaultBadStatus } from '../actions/bad-status';
import { CardContainer } from '../../components/card-container';
import * as uuid from 'uuid';
import { Attribute } from '../actions/attribute';
import { InputField } from '../../components/atoms/input-field';

export type CharacterTableState = {
    sessionName: string;
    characters: CharacterProps[];
    currentNewCharacter: CharacterProps;
    deleteCharacterName: string;
    isModalOpen: boolean;
};

export type CharacterProps = {
    name: string;
    attribute: Attribute;
    defaultActionPriority: number;
    actionPriority: number;
    hp: number;
    maxHp: number;
    physicalDefence: number;
    defaultPhysicalDefence: number;
    magicalDefence: number;
    defaultMagicalDefence: number;
    badStatus: BadStatus;
    isActed: boolean;
};

export function Character(
    name: string = '',
    attribute: Attribute = 'None',
    actionPriority: number = 0,
    defaultActionPriority: number = 0,
    hp: number = 0,
    maxHp: number = 0,
    physicalDefence: number = 0,
    defaultPhysicalDefence: number = 0,
    magicalDefence: number = 0,
    defaultMagicalDefence: number = 0,
): CharacterProps {
    const badStatus = defaultBadStatus;
    return {
        name,
        attribute,
        defaultActionPriority,
        actionPriority,
        hp,
        maxHp,
        physicalDefence,
        defaultPhysicalDefence,
        magicalDefence,
        defaultMagicalDefence,
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
                key={uuid.v4()}
                {...character}
                isNextPrior={character.actionPriority === nextActionPriority}
                onChangeElementText={e => props.updateCharacterAttributeText({ e, name: character.name })}
                onChangeElementCheckbox={e => props.updateCharacterCheckbox({ e, name: character.name })}
                onChangeElementDropdown={e => props.updateCharacterDropdown({ e, name: character.name })}
                onCopyCharacter={_ => props.copyCharacter(character)}
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
                        onClick={() => props.saveCharacters(props.sessionName, props.characters)}
                    />
                </span>
                <span className="save-container__save-newly-button">
                    <Button
                        name="save-newly"
                        value="新規セッションとして保存"
                        kind="primary"
                        onClick={() => props.saveCharactersNewly(props.sessionName, props.characters)}
                    />
                </span>
            </div>
            <CardContainer className="character-table">
                <InputField
                    name="session-name"
                    className="character-table__session-name"
                    kind="text"
                    showBorder={false}
                    value={props.sessionName}
                    onChange={e => props.updateSessionNameText({ e })}
                />
                <table className="character-table__table">
                    <thead>
                        <tr>
                            <td>行動済</td>
                            <td>名前</td>
                            <td>行動値 / 元</td>
                            <td>HP / 最大HP</td>
                            <td>物理防御力 / 元</td>
                            <td>魔法防御力 / 元</td>
                            <td>属性</td>
                            <td>バッドステータス</td>
                            <td>各種操作</td>
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
