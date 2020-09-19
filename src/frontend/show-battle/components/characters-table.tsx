import * as React from 'react';

import { CharacterElement } from './character-element';
import { Actions } from '../show-battle-container';
import { Button } from '../../components/atoms/button';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { Dialog } from '../../components/molecules/dialog';
import { BadStatus, defaultBadStatus } from '../actions/bad-status';
import { CardContainer } from '../../components/card-container';
import { Attribute } from '../actions/attribute';
import { InputField } from '../../components/atoms/input-field';
import { Skill } from '../../types/skill';
import { CharacterDetails } from './character-details';
import { Modal } from '../../types/modal';

export type CharacterTableState = {
    state: {
        sessionName: string;
        characters: CharacterProps[];
    };
    current: {
        currentNewCharacter: CharacterProps;
        deleteCharacterName: string;
    };
    dom: {
        modal: Modal | null;
    };
};

export type CharacterProps = {
    id?: string;
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
    strength: number;
    strength_base: number;
    dexterity: number;
    dexterity_base: number;
    agility: number;
    agility_base: number;
    wisdom: number;
    wisdom_base: number;
    sensitivity: number;
    sensitivity_base: number;
    power: number;
    power_base: number;
    luck: number;
    luck_base: number;
    isActed: boolean;
    memo: string;
    badStatus: BadStatus;
    skills: Skill[];
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
    strength: number = 0,
    strength_base: number = 0,
    dexterity: number = 0,
    dexterity_base: number = 0,
    agility: number = 0,
    agility_base: number = 0,
    wisdom: number = 0,
    wisdom_base: number = 0,
    sensitivity: number = 0,
    sensitivity_base: number = 0,
    power: number = 0,
    power_base: number = 0,
    luck: number = 0,
    luck_base: number = 0,

    isActed: boolean = false,
    memo: string = '',
    badStatus: BadStatus = defaultBadStatus,
    skills: Skill[] = [],
): CharacterProps {
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
        isActed,
        memo,
        skills,
        strength,
        strength_base,
        dexterity,
        dexterity_base,
        agility,
        agility_base,
        wisdom,
        wisdom_base,
        sensitivity,
        sensitivity_base,
        power,
        power_base,
        luck,
        luck_base,
    };
}

type CharacterTableProps = CharacterTableState & Actions;

export const CharactersTable: React.SFC<CharacterTableProps> = (props: CharacterTableProps) => {
    React.useEffect(() => {
        props.loadCharacters();
    }, []);

    const {
        state: { sessionName, characters },
        current: { currentNewCharacter },
        dom: { modal },
    } = props;

    const nextActionPriority = Math.max(...characters.filter(x => !x.isActed).map(x => x.actionPriority));

    const characterElement = characters.map(character => {
        return (
            <CharacterElement
                key={character.name}
                {...character}
                isNextPrior={!character.isActed && character.actionPriority === nextActionPriority}
                onChangeElementNumberText={e => props.updateCharacterAttributeNumberText({ e, name: character.name })}
                onChangeElementText={e => props.updateCharacterAttributeText({ e, name: character.name })}
                onChangeElementCheckbox={e => props.updateCharacterCheckbox({ e, name: character.name })}
                onClickDropdownItem={(key, value) =>
                    props.updateButtonDropdownBadStatus({ key, value, name: character.name })
                }
                onChangeElementDropdown={e => props.updateCharacterAttributeDropdown({ e, name: character.name })}
                onCopyCharacter={_ => props.copyCharacter(character)}
                onDeleteCharacter={e => props.openDeletionModal({ e, name: character.name })}
                onClickCharacterDetailsButton={e => props.openCharacterDetails({ e, name: character.name })}
            />
        );
    });

    return (
        <div>
            {modal?.type === 'DeletionModal' ? (
                <Dialog
                    description={'本当に削除しますか？'}
                    enterLabel={'削除する'}
                    cancelLabel={'キャンセル'}
                    onClickEnter={() => props.deleteCharacter()}
                    onClickCancel={() => props.closeModal()}
                />
            ) : null}
            {modal?.type === 'CharacterDetailsModal' ? (
                <CharacterDetails
                    character={modal.character}
                    onChangeNumberInputField={e =>
                        props.updateCharacterAttributeNumberText({ e, name: characters[0].name })
                    }
                    onCloseModal={props.closeModal}
                />
            ) : null}
            <div className="save-container">
                <span className="save-container__save-button">
                    <Button
                        name="save"
                        value="保存"
                        kind="primary"
                        onClick={() => props.saveCharacters(sessionName, characters)}
                    />
                </span>
                <span className="save-container__save-newly-button">
                    <Button
                        name="save-newly"
                        value="新規セッションとして保存"
                        kind="primary"
                        onClick={() => props.saveCharactersNewly(sessionName, characters)}
                    />
                </span>
            </div>
            <CardContainer className="character-table">
                <InputField
                    name="session-name"
                    className="character-table__session-name"
                    kind="text"
                    showBorder={false}
                    value={sessionName}
                    onChange={e => props.updateSessionName({ e })}
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
                            <td>メモ</td>
                            <td>各種操作</td>
                        </tr>
                    </thead>
                    <tbody>{characterElement}</tbody>
                </table>
                <InputFieldWithButton
                    name={'character-name'}
                    value={currentNewCharacter.name}
                    buttonLabel={'新しくキャラクターを追加'}
                    placeholder={'キャラクター名'}
                    onChange={e => props.updateCurrentNewCharacter(e)}
                    onClick={() => props.addNewCharacter()}
                />
            </CardContainer>
        </div>
    );
};
