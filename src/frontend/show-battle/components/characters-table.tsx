import * as React from 'react';

import { CharacterElement } from './character-element';
import { Actions } from '../show-battle-container';
import { Button } from '../../components/atoms/button';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { Dialog } from '../../components/molecules/dialog';
import { CardContainer } from '../../components/card-container';
import { InputField } from '../../components/atoms/input-field';
import { CharacterDetails } from './character-details';
import { Modal } from '../../types/modal';
import { Character } from '../../types/character';
import { CharacterID } from '../actions/actions';

export type CharacterTableState = {
    state: {
        sessionName: string;
        characters: Character[];
    };
    current: {
        currentNewCharacter: Character;
        deleteCharacterID: CharacterID;
        modalCharacterID: CharacterID;
    };
    dom: {
        modal: Modal | null;
    };
};

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
                key={character.id}
                {...character}
                isNextPrior={!character.isActed && character.actionPriority === nextActionPriority}
                onChangeElementNumberText={e =>
                    props.updateCharacterAttributeNumberText({ e, payload: character.id })
                }
                onChangeElementText={e => props.updateCharacterAttributeText({ e, payload: character.id })}
                onChangeElementCheckbox={e => props.updateCharacterCheckbox({ e, payload: character.id })}
                onClickDropdownItem={(key, value) =>
                    props.updateButtonDropdownBadStatus({ key, value, characterId: character.id })
                }
                onChangeElementDropdown={e => props.updateCharacterAttributeDropdown({ e, payload: character.id })}
                onCopyCharacter={_ => props.copyCharacter(character)}
                onDeleteCharacter={e => props.openDeletionModal({ e, payload: character.id })}
                onClickCharacterDetailsButton={e => props.openCharacterDetails({ e, payload: character.id })}
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
                    character={characters.filter(x => x.id === modal.characterID)[0]}
                    onChangeNumberInputField={e =>
                        props.updateCharacterAttributeNumberText({ e, payload: modal.characterID })
                    }
                    onChangeTextInputField={e =>
                        props.updateCharacterAttributeText({ e, payload: modal.characterID })
                    }
                    onChangeElementSkillText={(e, idx) =>
                        props.updateSkillAttributeText({
                            e,
                            payload: { characterID: modal.characterID, skillIndex: idx },
                        })
                    }
                    onClickAddSkillButton={props.addNewSkill}
                    onClickDeleteSkillButton={(e, skillName) =>
                        props.deleteSkill({ e, payload: { characterID: modal.characterID, skillName } })
                    }
                    onCloseModal={props.closeModal}
                    onMoveSkill={(dragIdx, dropIdx) =>
                        props.moveSkill({ characterID: modal.characterID, dragIdx, dropIdx })
                    }
                    onLoadSkillsCsv={props.loadSkillsCsv}
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
