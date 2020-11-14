import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState } from './components/characters-table';
import { Dispatch, Action } from 'redux';
import {
    actions,
    ChangeActionProps,
    MouseActionProps,
    ChangeSessionNameProps,
    ClickDropDownListItemProps,
    CharacterUUID,
    SkillName,
    MoveSkillProps,
} from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';
import { Character } from '../types/character';
import { parseCsv } from '../utils/skill-csv-parser';

export interface Actions {
    updateSessionName: (v: ChangeSessionNameProps) => Action<string>;
    updateCharacterAttributeNumberText: (v: ChangeActionProps<CharacterUUID>) => Action<string>;
    updateCharacterAttributeText: (v: ChangeActionProps<CharacterUUID>) => Action<string>;
    updateSkillAttributeText: (
        v: ChangeActionProps<{ characterUUID: CharacterUUID; skillIndex: number }>,
    ) => Action<string>;
    updateCharacterCheckbox: (v: ChangeActionProps<CharacterUUID>) => Action<string>;
    updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) => Action<string>;
    updateCharacterAttributeDropdown: (v: ChangeActionProps<CharacterUUID>) => Action<string>;
    openDeletionModal: (v: MouseActionProps<CharacterUUID>) => Action<string>;
    closeModal: () => Action<string>;
    openCharacterDetails: (v: MouseActionProps<CharacterUUID>) => Action<string>;
    copyCharacter: (v: Character) => Action<string>;
    deleteCharacter: () => Action<string>;
    deleteSkill: (v: MouseActionProps<{ characterUUID: CharacterUUID; skillName: SkillName }>) => Action<string>;
    moveSkill: (v: MoveSkillProps) => Action<string>;
    updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    addNewCharacter: () => Action<string>;
    addNewSkill: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (sessionName: string, v: Character[]) => void;
    saveCharactersNewly: (sessionName: string, characters: Character[]) => void;
    loadSkillsCsv: (characterUUID: CharacterUUID, files: FileList | null) => void;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTable);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateSessionName: (v: ChangeSessionNameProps) => dispatch(actions.updateSessionName(v)),
        updateCharacterAttributeNumberText: (v: ChangeActionProps<CharacterUUID>) =>
            dispatch(actions.updateCharacterAttributeNumberText(v)),
        updateCharacterAttributeText: (v: ChangeActionProps<CharacterUUID>) =>
            dispatch(actions.updateCharacterAttributeText(v)),
        updateSkillAttributeText: (v: ChangeActionProps<{ characterUUID: CharacterUUID; skillIndex: number }>) =>
            dispatch(actions.updateSkillAttributeText(v)),
        updateCharacterCheckbox: (v: ChangeActionProps<CharacterUUID>) => dispatch(actions.updateCharacterCheckbox(v)),
        updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) =>
            dispatch(actions.updateButtonDropdownBadStatus(v)),
        updateCharacterAttributeDropdown: (v: ChangeActionProps<CharacterUUID>) =>
            dispatch(actions.updateCharacterAttributeDropdown(v)),
        openDeletionModal: (v: MouseActionProps<CharacterUUID>) => dispatch(actions.openDeletionModal(v)),
        closeModal: () => dispatch(actions.closeModal()),
        deleteCharacter: () => dispatch(actions.deleteCharacter()),
        deleteSkill: (v: MouseActionProps<{ characterUUID: CharacterUUID; skillName: SkillName }>) =>
            dispatch(actions.deleteSkill(v)),
        moveSkill: (v: MoveSkillProps) => dispatch(actions.moveSkill(v)),
        openCharacterDetails: (v: MouseActionProps<CharacterUUID>) => dispatch(actions.openCharacterDetails(v)),
        copyCharacter: (v: Character) => dispatch(actions.copyCharacter({ character: v })),
        updateCurrentNewCharacter: (v: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(actions.updateCurrentNewCharacter(v)),
        addNewCharacter: () => dispatch(actions.addNewCharacter()),
        addNewSkill: () => dispatch(actions.addNewSkill()),
        loadCharacters: loadCharactersMapper(dispatch),
        saveCharacters: saveCharactersMapper(dispatch),
        saveCharactersNewly: saveCharactersNewlyMapper(dispatch),
        loadSkillsCsv: loadSkillsCsvMapper(dispatch),
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

function loadSkillsCsvMapper(dispatch: Dispatch<Action<string>>) {
    return (characterUUID: CharacterUUID, files: FileList | null) => {
        dispatch(actions.startedLoadingSkillsCsv({ characterUUID }));

        if (files === null || files.length === 0) {
            dispatch(actions.failedLoadingSkillsCsv({ params: { characterUUID }, error: {} }));
            return;
        }

        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                }
            };
            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsText(files[0]);
        })
            .then(res => {
                const parsedSkills = parseCsv(res);

                dispatch(
                    actions.doneLoadingSkillsCsv({
                        params: { characterUUID },
                        result: { skills: parsedSkills },
                    }),
                );
            })
            .catch(err => {
                console.log(err);
                dispatch(actions.failedLoadingSkillsCsv({ params: { characterUUID }, error: {} }));
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
