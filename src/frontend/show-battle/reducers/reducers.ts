import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CharacterTableState } from '../components/characters-table';
import { actions, CharacterUUID } from '../actions/actions';
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
import { Skill } from '../../types/skill';
import { Character } from '../../types/character';
import { addNewSkill, deleteSkill, moveSkill, updateSkillAttributeText } from './skill-reducer';
import { updateItemInArray, updateObject } from '../../utils/reducer-commons';

const initialState: CharacterTableState = {
    state: {
        sessionName: '',
        characters: [],
    },
    current: {
        currentNewCharacter: Character(),
        deleteCharacterUUID: '',
        modalCharacterUUID: '',
    },
    dom: {
        modal: null,
    },
};

export function characterSelector(CharacterUUID: CharacterUUID) {
    return (character: Character, _: number) => character.uuid === CharacterUUID;
}

export function skillSelector(skillName: string) {
    return (skill: Skill, _: number) => skill.name === skillName;
}

export function indexSelector<T>(targetIdx: number) {
    return (_: T, idx: number) => idx === targetIdx;
}

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.updateSessionName, updateSessionName)
    .case(actions.updateCharacterAttributeText, updateCharacterAttributeText)
    .case(actions.updateCharacterAttributeNumberText, updateCharacterAttributeNumberText)
    .case(actions.updateSkillAttributeText, updateSkillAttributeText)
    .case(actions.updateCharacterCheckbox, updateCharacterCheckbox)
    .case(actions.updateButtonDropdownBadStatus, updateButtonDropdownBadStatus)
    .case(actions.updateCharacterAttributeDropdown, updateCharacterAttributeDropdown)
    .case(actions.addNewCharacter, addNewCharacter)
    .case(actions.addNewSkill, addNewSkill)
    .case(actions.moveSkill, moveSkill)
    .case(actions.copyCharacter, copyCharacter)
    .case(actions.deleteCharacter, deleteCharacter)
    .case(actions.deleteSkill, deleteSkill)
    .case(actions.openDeletionModal, (state, props) => {
        return {
            ...state,
            current: { ...state.current, deleteCharacterName: props.payload },
            dom: { ...state.dom, modal: { type: 'DeletionModal' } },
        };
    })
    .case(actions.openCharacterDetails, (state, props) => {
        const { payload: uuid } = props;
        const character = state.state.characters.find(x => x.uuid === uuid);

        if (character === undefined) {
            console.log('Failed actions.openCharacterDetails');
            return state;
        }

        return {
            ...state,
            dom: { ...state.dom, modal: { type: 'CharacterDetailsModal', characterUUID: uuid } },
        };
    })
    .case(actions.closeModal, (state, _props) => {
        return { ...state, dom: { ...state.dom, modal: null } };
    })
    .case(actions.updateCurrentNewCharacter, (state, props) => {
        const currentNewCharacter = Character(undefined, props.target.value);

        return { ...state, current: { ...state.current, currentNewCharacter } };
    })
    .case(actions.doneLoadingCharacters, (state, props) => {
        return { ...state, state: props.result.state };
    })
    .case(actions.doneLoadingSkillsCsv, (state, props) => {
        const skills = props.result.skills;
        const characterUUID = props.params.characterUUID;

        const characters = updateItemInArray(state.state.characters, characterSelector(characterUUID), character => {
            return updateObject(character, { skills });
        });

        return { ...state, state: { ...state.state, characters } };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
