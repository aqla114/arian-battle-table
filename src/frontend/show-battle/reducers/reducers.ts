import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CharacterTableState, Character, CharacterProps } from '../components/characters-table';
import { actions } from '../actions/actions';
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

const initialState: CharacterTableState = {
    state: {
        sessionName: '',
        characters: [],
    },
    current: {
        currentNewCharacter: Character(),
        deleteCharacterName: '',
    },
    dom: {
        modal: null,
    },
};

export function characterSelector(characterName: string) {
    return (character: CharacterProps) => character.name === characterName;
}

// TODO: キャラクター名で filter するの結構微妙みあるからできれば id とかをちゃんと扱うようにしたいかも。
export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.updateSessionName, updateSessionName)
    .case(actions.updateCharacterAttributeText, updateCharacterAttributeText)
    .case(actions.updateCharacterAttributeNumberText, updateCharacterAttributeNumberText)
    .case(actions.updateCharacterCheckbox, updateCharacterCheckbox)
    .case(actions.updateButtonDropdownBadStatus, updateButtonDropdownBadStatus)
    .case(actions.updateCharacterAttributeDropdown, updateCharacterAttributeDropdown)
    .case(actions.addNewCharacter, addNewCharacter)
    .case(actions.copyCharacter, copyCharacter)
    .case(actions.deleteCharacter, deleteCharacter)
    .case(actions.openDeletionModal, (state, props) => {
        return {
            ...state,
            current: { ...state.current, deleteCharacterName: props.name },
            dom: { ...state.dom, modal: { type: 'DeletionModal' } },
        };
    })
    .case(actions.openCharacterDetails, (state, props) => {
        const { name } = props;
        const character = state.state.characters.filter(x => x.name === name)[0];

        return {
            ...state,
            dom: { ...state.dom, modal: { type: 'CharacterDetailsModal', character } },
        };
    })
    .case(actions.closeDeletionModal, (state, _props) => {
        return { ...state, dom: { ...state.dom, modal: null } };
    })
    .case(actions.updateCurrentNewCharacter, (state, props) => {
        const currentNewCharacter = Character(props.target.value);

        return { ...state, current: { ...state.current, currentNewCharacter } };
    })
    .case(actions.doneLoadingCharacters, (state, props) => {
        return { ...state, state: props.result.state };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
