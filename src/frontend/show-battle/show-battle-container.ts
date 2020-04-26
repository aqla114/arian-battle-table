import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState, CharacterProps } from './components/characters-table';
import { Dispatch, Action } from 'redux';
import { actions, ChangeActionProps, MouseActionProps } from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';

export interface Actions {
    updateCharacterAttributeText: (v: ChangeActionProps) => Action<string>;
    updateCharacterIsKnockBack: (v: ChangeActionProps) => Action<string>;
    deleteCharacter: (v: MouseActionProps) => Action<string>;
    updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    addNewCharacter: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (v: CharacterProps[]) => void;
    saveCharactersNewly: (sessionName: string, characters: CharacterProps[]) => void;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTable);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateCharacterAttributeText: (v: ChangeActionProps) => dispatch(actions.updateCharacterAttributeText(v)),
        updateCharacterIsKnockBack: (v: ChangeActionProps) => dispatch(actions.updateCharacterIsKnockBack(v)),
        deleteCharacter: (v: MouseActionProps) => dispatch(actions.deleteCharacter(v)),
        updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(actions.updateCurrentNewCharacter(v)),
        addNewCharacter: () => dispatch(actions.addNewCharacter()),
        loadCharacters: loadCharactersMapper(dispatch),
        saveCharacters: saveCharactersMapper(dispatch),
        saveCharactersNewly: saveCharactersNewlyMapper(dispatch),
    };
}

function loadCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return () => {
        dispatch(actions.startedLoadingCharacters({}));

        const id = location.pathname.split('/').slice(-1)[0];

        Request.get(`/api/${id}/get`).end((err, res) => {
            if (err) {
                console.error(err);
                dispatch(actions.failedLoadingCharacters({ params: {}, error: {} }));
            } else {
                console.log(res.body);

                const characters: CharacterProps[] = res.body.map((character: CharacterProps) => ({
                    name: character.name,
                    actionPriority: character.actionPriority,
                    hp: character.hp,
                    maxHp: character.maxHp,
                    physicalDefence: character.physicalDefence,
                    magicalDefence: character.magicalDefence,
                    isKnockBack: character.isKnockBack,
                }));

                dispatch(
                    actions.doneLoadingCharacters({
                        params: {},
                        result: { characters: characters.sort((a, b) => b.actionPriority - a.actionPriority) },
                    }),
                );
            }
        });
    };
}

function saveCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return (characters: CharacterProps[]) => {
        dispatch(actions.startedSaving({}));

        const id = location.pathname.split('/').slice(-1)[0];

        Request.post(`/api/${id}/update`)
            .send(characters)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    dispatch(actions.failedSaving({ params: {}, error: {} }));
                } else {
                    console.log('Response/saveCharacters : ', res.body);

                    dispatch(
                        actions.doneSaving({
                            params: {},
                            result: {},
                        }),
                    );
                }
            });
    };
}

function saveCharactersNewlyMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string, characters: CharacterProps[]) => {
        dispatch(actions.startedSavingNewly({}));

        Request.post(`/api/create`)
            .send({ sessionName, characters })
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    dispatch(actions.failedSavingNewly({ params: {}, error: {} }));
                } else {
                    console.log('Response/saveNewlyCurrentTable : ', res.body);

                    dispatch(
                        actions.doneSavingNewly({
                            params: {},
                            result: {},
                        }),
                    );

                    location.href = `/battle/${res.body.id}`;
                }
            });
    };
}

export const ShowBattleContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CharactersTable);
