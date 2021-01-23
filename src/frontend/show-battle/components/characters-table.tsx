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
import { FrontendCharacter } from '../../types/character';
import { CharacterID, GuildId } from '../actions/actions';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { IconButton } from '../../components/atoms/icon-button';

export type CharacterTableState = {
    state: {
        sessionName: string;
        characters: FrontendCharacter[];
    };
    current: {
        currentGuildId: GuildId;
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
        current: { currentGuildId },
        dom: { modal },
    } = props;

    const nextActionPriority = Math.max(...characters.filter(x => !x.isActed).map(x => x.actionPriority));

    const characterElement = characters.map(character => {
        return (
            <CharacterElement
                key={character.frontendId}
                {...character}
                isNextPrior={!character.isActed && character.actionPriority === nextActionPriority}
                onChangeElementNumberText={e =>
                    props.updateCharacterAttributeNumberText({ e, payload: character.frontendId })
                }
                onChangeElementText={e => props.updateCharacterAttributeText({ e, payload: character.frontendId })}
                onChangeElementCheckbox={e => props.updateCharacterCheckbox({ e, payload: character.frontendId })}
                onClickDropdownItem={(key, value) =>
                    props.updateButtonDropdownBadStatus({ key, value, characterId: character.frontendId })
                }
                onChangeElementDropdown={e =>
                    props.updateCharacterAttributeDropdown({ e, payload: character.frontendId })
                }
                onCopyCharacter={_ => props.copyCharacter(character)}
                onDeleteCharacter={e => props.openDeletionModal({ e, payload: character.frontendId })}
                onClickCharacterDetailsButton={e => props.openCharacterDetails({ e, payload: character.frontendId })}
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
                    onChangeTextInputField={e => props.updateCharacterAttributeText({ e, payload: modal.characterID })}
                    onChangeElementSkillText={(e, idx) =>
                        props.updateSkillAttributeText({
                            e,
                            payload: { characterID: modal.characterID, skillIndex: idx },
                        })
                    }
                    onClickAddSkillButton={props.addNewSkill}
                    onClickDeleteSkillButton={(e, skillId) =>
                        props.deleteSkill({ e, payload: { characterID: modal.characterID, skillId } })
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
                    <thead className="character-table__table__header">
                        <tr>
                            <th>行動済</th>
                            <th>名前</th>
                            <th>行動値 / 元</th>
                            <th>HP / 最大HP</th>
                            <th>物理防御力 / 元</th>
                            <th>魔法防御力 / 元</th>
                            <th>属性</th>
                            <th>バッドステータス</th>
                            <th>メモ</th>
                            <th>各種操作</th>
                        </tr>
                    </thead>
                    <tbody className="character-table__table__body">{characterElement}</tbody>
                </table>
                <div className="character-table__add-button">
                    <IconButton name={'add'} icon={faPlusSquare} size={'small'} onClick={props.addNewCharacter} />
                </div>
                <InputFieldWithButton
                    name={'guild-id'}
                    value={currentGuildId}
                    buttonLabel={'ギルドからキャラクターをインポート'}
                    placeholder={'ギルドID (ex.114514)'}
                    onChange={e => props.updateCurrentGuildId({ e })}
                    onClick={() =>
                        props.importCharactersByGuildId(props.current.currentGuildId, props.state.characters)
                    }
                />
            </CardContainer>
        </div>
    );
};
