import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState, CharacterProps } from './characters-table';
import { Dispatch, Action } from 'redux';
import { actions, ChangeActionProps, MouseActionProps } from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';

export interface Actions {
    updateCharacterAttributeText: (v: ChangeActionProps) => Action<string>;
    updateCharacterIsKnockBack: (v: MouseActionProps) => Action<string>;
    deleteCharacter: (v: MouseActionProps) => Action<string>;
    updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    addNewCharacter: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (v: CharacterProps[]) => void;
    saveCharactersNewly: (v: CharacterProps[]) => void;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTabel);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateCharacterAttributeText: (v: ChangeActionProps) => dispatch(actions.updateCharacterAttributeText(v)),
        updateCharacterIsKnockBack: (v: MouseActionProps) => dispatch(actions.updateCharacterIsKnockBack(v)),
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
        dispatch(actions.startedLoading({}));

        Request.get(`/api/${location.pathname.slice(1)}/get`).end((err, res) => {
            if (err) {
                console.error(err);
                dispatch(actions.failedLoading({ params: {}, error: {} }));
            } else {
                console.log(res.body);

                const characters: CharacterProps[] = res.body.map((character: CharacterProps) => ({
                    name: character.name,
                    actionPriority: character.actionPriority,
                    hp: character.hp,
                    physicalDefence: character.physicalDefence,
                    magicalDefence: character.magicalDefence,
                    isKnockBack: character.isKnockBack,
                }));

                dispatch(
                    actions.doneLoading({
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

        Request.post(`/api/${location.pathname.slice(1)}/update`)
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
    return (characters: CharacterProps[]) => {
        dispatch(actions.startedSavingNewly({}));

        Request.post(`/api/create`)
            .send(characters)
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

                    location.href = `${res.body.id}`;
                }
            });
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CharactersTable);
