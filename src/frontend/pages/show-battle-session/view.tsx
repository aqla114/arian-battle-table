import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { Beforeunload } from 'react-beforeunload';
import { ToastContainer } from 'react-toastify';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import { CharacterElement } from './components/character-element';
import { Actions } from './show-battle-container';
import { Button } from '../../components/atoms/button';
import { InputFieldWithButton } from '../../components/molecules/input-field-with-button';
import { CardContainer } from '../../components/card-container';
import { InputField } from '../../components/atoms/input-field';
import { IconButton } from '../../components/atoms/icon-button';
import { DiceRoller } from './components/dice-roller';
import { Modal } from './components/modal';

type CharacterTableProps = Actions;

export const View: React.FunctionComponent<CharacterTableProps> = (props: CharacterTableProps) => {
    React.useEffect(() => {
        props.loadCharacters();
    }, []);

    const charactersTableState = useSelector(state => state.showBattle);

    useHotkeys('command+z, ctrl+z', () => {
        props.restoreHistory();
    });

    console.log(charactersTableState);

    const {
        state: { sessionName, characters },
        current: { currentGuildId, unsaved },
        dom: { modal },
    } = charactersTableState;

    const nextActionPriority = Math.max(...characters.filter(x => !x.isActed).map(x => x.actionPriority));

    const characterElement = characters.map(character => {
        return (
            <CharacterElement
                key={character.frontendId}
                {...character}
                isNextPrior={!character.isActed && character.actionPriority === nextActionPriority}
                onChangeElementNumber={e => props.updateCharacterAttributeNumber({ e, payload: character.frontendId })}
                onChangeElementText={e => props.updateCharacterAttributeText({ e, payload: character.frontendId })}
                onChangeElementCheckbox={e => props.updateCharacterCheckbox({ e, payload: character.frontendId })}
                onClickDropdownItem={(key, value) =>
                    props.updateButtonDropdownBadStatus({ key, value, characterId: character.frontendId })
                }
                onChangeElementDropdown={e =>
                    props.updateCharacterAttributeDropdown({ e, payload: character.frontendId })
                }
                onCopyCharacter={_ => props.copyCharacter({ character })}
                onDeleteCharacter={e => props.openDeletionModal({ e, payload: character.frontendId })}
                onClickCharacterDetailsButton={e => props.openCharacterDetails({ e, payload: character.frontendId })}
            />
        );
    });

    return (
        <Beforeunload onBeforeunload={event => unsaved && event.preventDefault()}>
            <Modal modal={modal} characters={characters} {...props} />
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
                    onClick={() => props.importCharactersByGuildId(currentGuildId, characters)}
                />
            </CardContainer>
            <DiceRoller />
            <ToastContainer position={'top-center'} autoClose={2000} />
        </Beforeunload>
    );
};
