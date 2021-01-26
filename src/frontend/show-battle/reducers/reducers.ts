import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CharacterTableState } from '../components/characters-table';
import { actions, CharacterId } from '../actions/actions';
import { updateSessionName } from './session-name-reducer';
import {
    updateCharacterAttributeNumberText,
    updateCharacterCheckbox,
    updateButtonDropdownBadStatus,
    updateCharacterAttributeDropdown,
    copyCharacter,
    deleteCharacter,
    addNewCharacter,
    updateCharacterAttributeText,
    doneLoadingCharacters,
    doneSaving,
    startedSavingNewly,
} from './characters-reducer';
import { FrontendSkill } from '../../types/skill';
import { FrontendCharacter } from '../../types/character';
import { addNewSkill, deleteSkill, doneLoadingSkillsCsv, moveSkill, updateSkillAttributeText } from './skill-reducer';
import { updateObject } from '../../utils/reducer-commons';
import { Reducer } from 'react';
import { closeModal, openCharacterDetails, openDeletionModal } from './modal-reducer';
import { doneImportCharactersByGuildId, updateCurrentGuildId } from './guild-id-reducer';

const initialState: CharacterTableState = {
    state: {
        sessionName: '',
        characters: [],
    },
    current: {
        currentGuildId: '',
        deleteCharacterID: '',
        modalCharacterID: '',
        unsaved: false,
    },
    dom: {
        modal: null,
    },
};

// reducer のミドルウェア的な処理をする。reducer を受け取り reducer を返す。
// 全 reducer で共通したい処理などを、middleware として与える。
export function reducerWrapper<T>(
    srcReducer: Reducer<CharacterTableState, T>,
    middleware: Reducer<CharacterTableState, T>,
): Reducer<CharacterTableState, T> {
    return (state: CharacterTableState, props: T) => middleware(srcReducer(state, props), props);
}

// Character 要素の更新時に入れたい State の更新を入れる。
export function characterReducerWrapper<T>(reducer: Reducer<CharacterTableState, T>): Reducer<CharacterTableState, T> {
    return reducerWrapper(reducer, (state: CharacterTableState, _: T) => {
        return updateObject(state, { current: updateObject(state.current, { unsaved: true }) });
    });
}

export function characterSelector(CharacterID: CharacterId) {
    return (character: FrontendCharacter, _: number) => character.frontendId === CharacterID;
}

export function skillSelector(skillName: string) {
    return (skill: FrontendSkill, _: number) => skill.name === skillName;
}

export function indexSelector<T>(targetIdx: number) {
    return (_: T, idx: number) => idx === targetIdx;
}

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.updateSessionName, characterReducerWrapper(updateSessionName))
    .case(actions.updateCharacterAttributeText, characterReducerWrapper(updateCharacterAttributeText))
    .case(actions.updateCharacterAttributeNumberText, characterReducerWrapper(updateCharacterAttributeNumberText))
    .case(actions.updateSkillAttributeText, characterReducerWrapper(updateSkillAttributeText))
    .case(actions.updateCharacterCheckbox, characterReducerWrapper(updateCharacterCheckbox))
    .case(actions.updateButtonDropdownBadStatus, characterReducerWrapper(updateButtonDropdownBadStatus))
    .case(actions.updateCharacterAttributeDropdown, characterReducerWrapper(updateCharacterAttributeDropdown))
    .case(actions.addNewCharacter, characterReducerWrapper(addNewCharacter))
    .case(actions.addNewSkill, characterReducerWrapper(addNewSkill))
    .case(actions.moveSkill, characterReducerWrapper(moveSkill))
    .case(actions.copyCharacter, characterReducerWrapper(copyCharacter))
    .case(actions.deleteCharacter, characterReducerWrapper(deleteCharacter))
    .case(actions.deleteSkill, characterReducerWrapper(deleteSkill))
    .case(actions.openDeletionModal, openDeletionModal)
    .case(actions.openCharacterDetails, openCharacterDetails)
    .case(actions.closeModal, closeModal)
    .case(actions.updateCurrentGuildId, updateCurrentGuildId)
    .case(actions.doneLoadingCharacters, doneLoadingCharacters)
    .case(actions.doneLoadingSkillsCsv, doneLoadingSkillsCsv)
    .case(actions.doneImportCharactersByGuildId, doneImportCharactersByGuildId)
    .case(actions.doneSaving, doneSaving)
    .case(actions.startedSavingNewly, startedSavingNewly)
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
