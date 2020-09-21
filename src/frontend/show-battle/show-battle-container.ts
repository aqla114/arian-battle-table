import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState } from './components/characters-table';
import { Dispatch, Action } from 'redux';
import {
    actions,
    ChangeActionProps,
    MouseActionProps,
    ChangeSessionNameProps,
    ClickDropDownListItemProps,
    CharacterName,
    SkillName,
} from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';
import { Character } from '../types/character';

export interface Actions {
    updateSessionName: (v: ChangeSessionNameProps) => Action<string>;
    updateCharacterAttributeNumberText: (v: ChangeActionProps<CharacterName>) => Action<string>;
    updateCharacterAttributeText: (v: ChangeActionProps<CharacterName>) => Action<string>;
    updateSkillAttributeText: (
        v: ChangeActionProps<{ characterName: CharacterName; skillName: SkillName }>,
    ) => Action<string>;
    updateCharacterCheckbox: (v: ChangeActionProps<CharacterName>) => Action<string>;
    updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) => Action<string>;
    updateCharacterAttributeDropdown: (v: ChangeActionProps<CharacterName>) => Action<string>;
    openDeletionModal: (v: MouseActionProps<CharacterName>) => Action<string>;
    closeModal: () => Action<string>;
    openCharacterDetails: (v: MouseActionProps<CharacterName>) => Action<string>;
    copyCharacter: (v: Character) => Action<string>;
    deleteCharacter: () => Action<string>;
    updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    addNewCharacter: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (sessionName: string, v: Character[]) => void;
    saveCharactersNewly: (sessionName: string, characters: Character[]) => void;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTable);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateSessionName: (v: ChangeSessionNameProps) => dispatch(actions.updateSessionName(v)),
        updateCharacterAttributeNumberText: (v: ChangeActionProps<CharacterName>) =>
            dispatch(actions.updateCharacterAttributeNumberText(v)),
        updateCharacterAttributeText: (v: ChangeActionProps<CharacterName>) =>
            dispatch(actions.updateCharacterAttributeText(v)),
        updateSkillAttributeText: (v: ChangeActionProps<{ characterName: CharacterName; skillName: SkillName }>) =>
            dispatch(actions.updateSkillAttributeText(v)),
        updateCharacterCheckbox: (v: ChangeActionProps<CharacterName>) => dispatch(actions.updateCharacterCheckbox(v)),
        updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) =>
            dispatch(actions.updateButtonDropdownBadStatus(v)),
        updateCharacterAttributeDropdown: (v: ChangeActionProps<CharacterName>) =>
            dispatch(actions.updateCharacterAttributeDropdown(v)),
        openDeletionModal: (v: MouseActionProps<CharacterName>) => dispatch(actions.openDeletionModal(v)),
        closeModal: () => dispatch(actions.closeModal()),
        deleteCharacter: () => dispatch(actions.deleteCharacter()),
        openCharacterDetails: (v: MouseActionProps<CharacterName>) => dispatch(actions.openCharacterDetails(v)),
        copyCharacter: (v: Character) => dispatch(actions.copyCharacter({ character: v })),
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
                }: { characters: Character[]; sessionName: string } = res.body;

                const characters: Character[] = resCharacters.map((character: Character) => ({
                    ...character,
                }));

                console.log(characters);

                dispatch(
                    actions.doneLoadingCharacters({
                        params: {},
                        result: {
                            state: {
                                sessionName,
                                characters: characters.sort((a, b) => b.actionPriority - a.actionPriority),
                            },
                        },
                    }),
                );
            }
        });
    };
}

function saveCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string, characters: Character[]) => {
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
    return (sessionName: string, characters: Character[]) => {
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
