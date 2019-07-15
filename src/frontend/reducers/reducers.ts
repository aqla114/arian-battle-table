import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { CharacterTableState, Character, CharacterProps } from '../characters-table';
import { actions } from '../actions/actions';

const initialState: CharacterTableState = {
    characters: [],
    currentNewCharacter: Character(),
};

export const tableReducer = reducerWithInitialState(initialState)
    .case(actions.updateCharacterAttributeText, (state, props) => {
        const { e, name } = props;
        const characters = state.characters.slice().map(x => ({ ...x }));
        const idx = characters.map(x => x.name).indexOf(name);

        characters[idx][e.target.name as keyof CharacterProps] = e.target.value;

        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        return { ...state, characters };
    })
    .case(actions.updateCharacterIsKnockBack, (state, props) => {
        const { e, name } = props;
        const characters = state.characters.slice().map(x => ({ ...x }));
        const idx = characters.map(x => x.name).indexOf(name);

        characters[idx].isKnockBack = !characters[idx].isKnockBack;

        if (characters[idx].isKnockBack) {
            characters[idx].actionPriority -= 10;
        } else {
            characters[idx].actionPriority += 10;
        }

        characters.sort((a, b) => b.actionPriority - a.actionPriority);

        return { ...state, characters };
    })
    .case(actions.deleteCharacter, (state, props) => {
        const { e, name } = props;
        const characters = state.characters
            .slice()
            .map(x => ({ ...x }))
            .filter(x => x.name !== name);

        return { ...state, characters };
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
    .case(actions.doneLoading, (state, props) => {
        return { ...state, characters: props.result.characters };
    })
    .default(state => {
        console.log('The default reducer is used.');
        return state;
    });
