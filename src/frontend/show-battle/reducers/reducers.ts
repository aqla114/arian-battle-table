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
} from './characters-reducer';
import { FrontendSkill } from '../../types/skill';
import { FrontendCharacter } from '../../types/character';
import { addNewSkill, deleteSkill, moveSkill, updateSkillAttributeText } from './skill-reducer';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';
import { Reducer } from 'react';
import { closeModal, openCharacterDetails, openDeletionModal } from './modal-reducer';

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
    .case(actions.updateCurrentGuildId, (state, props) => {
        return { ...state, current: updateObject(state.current, { currentGuildId: props.e.target.value }) };
    })
    .case(actions.doneLoadingCharacters, (state, props) => {
        return { ...state, state: props.result.state };
    })
    .case(actions.doneLoadingSkillsCsv, (state, props) => {
        const skills = props.result.skills;
        const characterId = props.params.characterId;

        const characters = updateItemInArray(state.state.characters, characterSelector(characterId), character => {
            return updateObject(character, { skills });
        });

        return { ...state, state: { ...state.state, characters } };
    })
    .case(actions.doneImportCharactersByGuildId, (state, props) => {
        return {
            ...state,
            state: updateObject(state.state, { characters: props.result.characters }),
            current: updateObject(state.current, { currentGuildId: '' }),
        };
    })
    .case(actions.doneSaving, (state, props) => {
        return {
            ...state,
            current: { ...state.current, unsaved: false },
        };
    })
    .case(actions.startedSavingNewly, (state, props) => {
        return {
            ...state,
            current: { ...state.current, unsaved: false },
        };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
