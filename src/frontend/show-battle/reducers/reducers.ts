import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CharacterTableState, Character, CharacterProps } from '../components/characters-table';
import { actions } from '../actions/actions';
import { BadStatus } from '../actions/bad-status';

const initialState: CharacterTableState = {
    sessionName: '',
    characters: [],
    currentNewCharacter: Character(),
    deleteCharacterName: '',
    isModalOpen: false,
};

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.updateCharacterAttributeText, (state, props) => {
        const { e, name } = props;
        const characters = state.characters.slice().map(x => ({ ...x }));
        const idx = characters.map(x => x.name).indexOf(name);

        if (e.target.value === '' || e.target.value === '-') {
            characters[idx] = { ...characters[idx], [e.target.name as keyof CharacterProps]: e.target.value };
        }
        const targetValue: number = parseInt(e.target.value);
        if (!isNaN(targetValue)) {
            characters[idx] = { ...characters[idx], [e.target.name as keyof CharacterProps]: targetValue };
        }

        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        return { ...state, characters };
    })
    .case(actions.updateCharacterCheckbox, (state, props) => {
        const { e, name } = props;
        const characters = state.characters.slice().map(x => ({ ...x }));
        const idx = characters.map(x => x.name).indexOf(name);

        const action = e.target.name;

        if (action === 'isKnockBack') {
            characters[idx].badStatus.knockback = !characters[idx].badStatus.knockback;

            if (characters[idx].badStatus.knockback) {
                characters[idx].actionPriority -= 30;
            } else {
                characters[idx].actionPriority += 30;
            }
            characters.sort((a, b) => b.actionPriority - a.actionPriority);
        } else if (action === 'isActed') {
            characters[idx].isActed = !characters[idx].isActed;
        } else {
            characters[idx].badStatus = {
                ...characters[idx].badStatus,
                [e.target.name]: !characters[idx].badStatus[e.target.name as keyof BadStatus],
            };
        }

        return { ...state, characters };
    })
    .case(actions.openDeletionModal, (state, props) => {
        return { ...state, isModalOpen: true, deleteCharacterName: props.name };
    })
    .case(actions.closeDeletionModal, (state, _props) => {
        return { ...state, isModalOpen: false };
    })
    .case(actions.deleteCharacter, (state, _) => {
        const { deleteCharacterName: name } = state;
        const characters = state.characters
            .slice()
            .map(x => ({ ...x }))
            .filter(x => x.name !== name);

        return { ...state, characters, isModalOpen: false, deleteCharacterName: '' };
    })
    .case(actions.updateCurrentNewCharacter, (state, props) => {
        const currentNewCharacter = Character(props.target.value, 0, 0, 0, 0);

        return Object.assign({}, state, { currentNewCharacter });
    })
    .case(actions.addNewCharacter, state => {
        const characters = state.characters.slice().map(x => ({ ...x }));

        if (characters.some(x => x.name === state.currentNewCharacter.name)) {
            window.alert('すでに存在しているキャラクター名です。キャラクター名は別のものを入力してください。');
            return state;
        }

        if (state.currentNewCharacter.name === '') {
            window.alert('キャラクターネームが空白です。');
            return state;
        }

        characters.push(state.currentNewCharacter);
        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        return { ...state, characters, currentNewCharacter: Character('', 0, 0, 0, 0) };
    })
    .case(actions.doneLoadingCharacters, (state, props) => {
        return { ...state, characters: props.result.characters };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
