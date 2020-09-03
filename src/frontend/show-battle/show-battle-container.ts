import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState, CharacterProps } from './components/characters-table';
import { Dispatch, Action } from 'redux';
import {
    actions,
    ChangeActionProps,
    MouseActionProps,
    ChangeSessionNameProps,
    ClickDropDownListItemProps,
} from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';

export interface Actions {
    updateSessionNameText: (v: ChangeSessionNameProps) => Action<string>;
    updateCharacterAttributeText: (v: ChangeActionProps) => Action<string>;
    updateCharacterCheckbox: (v: ChangeActionProps) => Action<string>;
    updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) => Action<string>;
    updateCharacterDropdown: (v: ChangeActionProps) => Action<string>;
    openDeletionModal: (v: MouseActionProps) => Action<string>;
    closeDeletionModal: () => Action<string>;
    copyCharacter: (v: CharacterProps) => Action<string>;
    deleteCharacter: () => Action<string>;
    updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    addNewCharacter: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (sessionName: string, v: CharacterProps[]) => void;
    saveCharactersNewly: (sessionName: string, characters: CharacterProps[]) => void;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTable);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateSessionNameText: (v: ChangeSessionNameProps) => dispatch(actions.updateSessionNameText(v)),
        updateCharacterAttributeText: (v: ChangeActionProps) => dispatch(actions.updateCharacterAttributeText(v)),
        updateCharacterCheckbox: (v: ChangeActionProps) => dispatch(actions.updateCharacterCheckbox(v)),
        updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) =>
            dispatch(actions.updateButtonDropdownBadStatus(v)),
        updateCharacterDropdown: (v: ChangeActionProps) => dispatch(actions.updateCharacterDropdown(v)),
        openDeletionModal: (v: MouseActionProps) => dispatch(actions.openDeletionModal(v)),
        closeDeletionModal: () => dispatch(actions.closeDeletionModal()),
        deleteCharacter: () => dispatch(actions.deleteCharacter()),
        copyCharacter: (v: CharacterProps) => dispatch(actions.copyCharacter({ character: v })),
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
                const {
                    characters: resCharacters,
                    sessionName,
                }: { characters: CharacterProps[]; sessionName: string } = res.body;

                const characters: CharacterProps[] = resCharacters.map((character: CharacterProps) => ({
                    ...character,
                }));

                dispatch(
                    actions.doneLoadingCharacters({
                        params: {},
                        result: {
                            sessionName,
                            characters: characters.sort((a, b) => b.actionPriority - a.actionPriority),
                        },
                    }),
                );
            }
        });
    };
}

function saveCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string, characters: CharacterProps[]) => {
        dispatch(actions.startedSaving({}));

        const id = location.pathname.split('/').slice(-1)[0];

        Request.post(`/api/${id}/update`)
            .send({ sessionName, characters })
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

export const ShowBattleContainer = connect(mapStateToProps, mapDispatchToProps)(CharactersTable);
