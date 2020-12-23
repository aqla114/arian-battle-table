import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState } from './components/characters-table';
import { Dispatch, Action } from 'redux';
import {
    actions,
    ChangeActionProps,
    MouseActionProps,
    ChangeSessionNameProps,
    ClickDropDownListItemProps,
    CharacterID,
    SkillName,
    MoveSkillProps,
    GuildId,
} from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';
import * as uuid from 'uuid';
import { Character } from '../types/character';
import { parseCsv } from '../utils/skill-csv-parser';

export interface Actions {
    updateSessionName: (v: ChangeSessionNameProps) => Action<string>;
    updateCharacterAttributeNumberText: (v: ChangeActionProps<CharacterID>) => Action<string>;
    updateCharacterAttributeText: (v: ChangeActionProps<CharacterID>) => Action<string>;
    updateSkillAttributeText: (
        v: ChangeActionProps<{ characterID: CharacterID; skillIndex: number }>,
    ) => Action<string>;
    updateCharacterCheckbox: (v: ChangeActionProps<CharacterID>) => Action<string>;
    updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) => Action<string>;
    updateCharacterAttributeDropdown: (v: ChangeActionProps<CharacterID>) => Action<string>;
    openDeletionModal: (v: MouseActionProps<CharacterID>) => Action<string>;
    closeModal: () => Action<string>;
    openCharacterDetails: (v: MouseActionProps<CharacterID>) => Action<string>;
    copyCharacter: (v: Character) => Action<string>;
    deleteCharacter: () => Action<string>;
    deleteSkill: (v: MouseActionProps<{ characterID: CharacterID; skillName: SkillName }>) => Action<string>;
    moveSkill: (v: MoveSkillProps) => Action<string>;
    updateCurrentNewCharacterName: (v: React.ChangeEvent<HTMLInputElement>) => Action<string>;
    updateCurrentGuildId: (v: ChangeActionProps) => Action<string>;
    addNewCharacter: () => Action<string>;
    addNewSkill: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (sessionName: string, v: Character[]) => void;
    saveCharactersNewly: (sessionName: string, characters: Character[]) => void;
    loadSkillsCsv: (characterID: CharacterID, files: FileList | null) => void;
    importCharactersByGuildId: (guildId: GuildId, characters: Character[]) => void;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTable);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateSessionName: (v: ChangeSessionNameProps) => dispatch(actions.updateSessionName(v)),
        updateCharacterAttributeNumberText: (v: ChangeActionProps<CharacterID>) =>
            dispatch(actions.updateCharacterAttributeNumberText(v)),
        updateCharacterAttributeText: (v: ChangeActionProps<CharacterID>) =>
            dispatch(actions.updateCharacterAttributeText(v)),
        updateSkillAttributeText: (v: ChangeActionProps<{ characterID: CharacterID; skillIndex: number }>) =>
            dispatch(actions.updateSkillAttributeText(v)),
        updateCharacterCheckbox: (v: ChangeActionProps<CharacterID>) => dispatch(actions.updateCharacterCheckbox(v)),
        updateButtonDropdownBadStatus: (v: ClickDropDownListItemProps) =>
            dispatch(actions.updateButtonDropdownBadStatus(v)),
        updateCharacterAttributeDropdown: (v: ChangeActionProps<CharacterID>) =>
            dispatch(actions.updateCharacterAttributeDropdown(v)),
        openDeletionModal: (v: MouseActionProps<CharacterID>) => dispatch(actions.openDeletionModal(v)),
        closeModal: () => dispatch(actions.closeModal()),
        deleteCharacter: () => dispatch(actions.deleteCharacter()),
        deleteSkill: (v: MouseActionProps<{ characterID: CharacterID; skillName: SkillName }>) =>
            dispatch(actions.deleteSkill(v)),
        moveSkill: (v: MoveSkillProps) => dispatch(actions.moveSkill(v)),
        openCharacterDetails: (v: MouseActionProps<CharacterID>) => dispatch(actions.openCharacterDetails(v)),
        copyCharacter: (v: Character) => dispatch(actions.copyCharacter({ character: v })),
        updateCurrentNewCharacterName: (v: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(actions.updateCurrentNewCharacterName(v)),
        updateCurrentGuildId: (v: ChangeActionProps) => dispatch(actions.updateCurrentGuildId(v)),
        addNewCharacter: () => dispatch(actions.addNewCharacter()),
        addNewSkill: () => dispatch(actions.addNewSkill()),
        loadCharacters: loadCharactersMapper(dispatch),
        saveCharacters: saveCharactersMapper(dispatch),
        saveCharactersNewly: saveCharactersNewlyMapper(dispatch),
        loadSkillsCsv: loadSkillsCsvMapper(dispatch),
        importCharactersByGuildId: importCharactersMapper(dispatch),
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
                const { characters: resCharacters, sessionName }: { characters: any[]; sessionName: string } = res.body;
                const characters: Character[] = resCharacters.map((character: any) => ({
                    ...character,
                    serverId: character.id,
                    id: uuid.v4(),
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

function importCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return (guildId: GuildId, currentCharacters: Character[]) => {
        dispatch(actions.startedImportCharactersByGuildId({}));

        const id = location.pathname.split('/').slice(-1)[0];

        let numberGuildId: number;
        try {
            numberGuildId = parseInt(guildId);
        } catch {
            dispatch(actions.failedImportCharactersByGuildId({ params: {}, error: {} }));
            return;
        }

        Request.post(`/api/${id}/load-characters-from-sheet`)
            .send({ guildId: numberGuildId })
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    dispatch(actions.failedImportCharactersByGuildId({ params: {}, error: {} }));
                } else {
                    const { characters: importedCharacters }: { characters: any[] } = res.body;
                    const characters: Character[] = [
                        ...currentCharacters,
                        ...importedCharacters.map((character: any) => ({
                            ...character,
                            serverId: character.id,
                            id: character.id || uuid.v4(),
                        })),
                    ];

                    console.log(characters);

                    dispatch(
                        actions.doneImportCharactersByGuildId({
                            params: {},
                            result: {
                                characters: characters.sort((a, b) => b.actionPriority - a.actionPriority),
                            },
                        }),
                    );
                }
            });
    };
}

function loadSkillsCsvMapper(dispatch: Dispatch<Action<string>>) {
    return (characterID: CharacterID, files: FileList | null) => {
        dispatch(actions.startedLoadingSkillsCsv({ characterID }));

        if (files === null || files.length === 0) {
            dispatch(actions.failedLoadingSkillsCsv({ params: { characterID }, error: {} }));
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
                        params: { characterID },
                        result: { skills: parsedSkills },
                    }),
                );
            })
            .catch(err => {
                console.log(err);
                dispatch(actions.failedLoadingSkillsCsv({ params: { characterID }, error: {} }));
            });
    };
}

function saveCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string, characters: Character[]) => {
        dispatch(actions.startedSaving({}));

        const id = location.pathname.split('/').slice(-1)[0];

        const serverCharacters = characters.map(character => {
            const { id: _, serverId, ...characterWithoutId } = character;
            if (serverId === null) {
                return { ...characterWithoutId };
            }
            return { ...characterWithoutId, id: serverId };
        });

        Request.post(`/api/${id}/update`)
            .send({ sessionName, characters: serverCharacters })
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

        const serverCharacters = characters.map(character => {
            const { id: _, serverId, ...characterWithoutId } = character;
            if (serverId === null) {
                return { ...characterWithoutId };
            }
            return { ...characterWithoutId, id: serverId };
        });

        Request.post(`/api/create`)
            .send({ sessionName, characters: serverCharacters })
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
