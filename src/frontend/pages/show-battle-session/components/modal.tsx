import * as React from 'react';
import { Dialog } from '../../../components/molecules/dialog';
import { FrontendCharacter } from '../../../types/character';
import { Actions } from '../show-battle-container';
import { Modal as ModalType } from '../types/modal';
import { CharacterDetails } from './character-details';

type Props = {
    modal: ModalType | null;
    characters: FrontendCharacter[];
    deleteCharacter: Actions['deleteCharacter'];
    closeModal: Actions['closeModal'];
    updateCharacterAttributeNumber: Actions['updateCharacterAttributeNumber'];
    updateCharacterAttributeText: Actions['updateCharacterAttributeText'];
    updateSkillAttributeText: Actions['updateSkillAttributeText'];
    addNewSkill: Actions['addNewSkill'];
    deleteSkill: Actions['deleteSkill'];
    moveSkill: Actions['moveSkill'];
    loadSkillsCsv: Actions['loadSkillsCsv'];
};

export const Modal: React.FC<Props> = ({
    modal,
    characters,
    deleteCharacter,
    closeModal,
    updateCharacterAttributeNumber,
    updateCharacterAttributeText,
    updateSkillAttributeText,
    addNewSkill,
    deleteSkill,
    moveSkill,
    loadSkillsCsv,
}) => {
    console.log(modal);

    if (modal?.type === 'DeletionModal') {
        return (
            <Dialog
                description={'本当に削除しますか？'}
                enterLabel={'削除する'}
                cancelLabel={'キャンセル'}
                onClickEnter={() => deleteCharacter()}
                onClickCancel={() => closeModal()}
            />
        );
    }

    if (modal?.type === 'CharacterDetailsModal') {
        return (
            <CharacterDetails
                character={characters.filter(x => x.frontendId === modal.characterId)[0]}
                onChangeNumberInputField={e => updateCharacterAttributeNumber({ e, payload: modal.characterId })}
                onChangeTextInputField={e => updateCharacterAttributeText({ e, payload: modal.characterId })}
                onChangeElementSkillText={(e, idx) =>
                    updateSkillAttributeText({
                        e,
                        payload: { characterId: modal.characterId, skillIndex: idx },
                    })
                }
                onClickAddSkillButton={addNewSkill}
                onClickDeleteSkillButton={(e, skillId) =>
                    deleteSkill({ e, payload: { characterId: modal.characterId, skillId } })
                }
                onCloseModal={closeModal}
                onMoveSkill={(dragIdx, dropIdx) => moveSkill({ characterId: modal.characterId, dragIdx, dropIdx })}
                onLoadSkillsCsv={loadSkillsCsv}
            />
        );
    }

    return null;
};
