import { connect } from 'react-redux';
import { CharactersTable, CharacterTableState } from './components/characters-table';
import { Dispatch, Action } from 'redux';
import { actions, CharacterId, GuildId } from './actions/actions';
import { State } from './store';
import * as Request from 'superagent';
import * as uuid from 'uuid';
import { FrontendCharacter } from '../types/character';
import { parseCsv } from '../utils/skill-csv-parser';
import { Character } from '../../types/character';
import { FrontendSkill } from '../types/skill';
import { UpdateSessionNameTextProps } from './actions/update-session-name';
import { UpdateCharacterAttributeNumberProps } from './actions/update-character-attribute-number-text';
import { UpdateCharacterAttributeTextProps } from './actions/update-character-attribute-text';
import { UpdateCharacterCheckboxProps } from './actions/update-character-checkbox';
import { UpdateButtonDropdownBadStatusProps } from './actions/update-button-dropdown-bad-status';
import { UpdateCharacterAttributeDropdownProps } from './actions/update-character-attribute-dropdown';
import { UpdateSkillAttributeTextProps } from './actions/update-skill-attribute-text';
import { DeleteSkillProps } from './actions/delete-skill';
import { MoveSkillProps } from './actions/move-skill';
import { OpenDeletionModalProps } from './actions/open-deletion-modal';
import { CopyCharacterProps } from './actions/copy-character';
import { OpenCharacterDetailsProps } from './actions/open-character-details';
import { UpdateCurrentGuildIdProps } from './actions/update-current-guild-id';

export interface Actions {
    updateSessionName: (v: UpdateSessionNameTextProps) => Action<string>;
    updateCharacterAttributeNumber: (v: UpdateCharacterAttributeNumberProps) => Action<string>;
    updateCharacterAttributeText: (v: UpdateCharacterAttributeTextProps) => Action<string>;
    updateCharacterCheckbox: (v: UpdateCharacterCheckboxProps) => Action<string>;
    updateButtonDropdownBadStatus: (v: UpdateButtonDropdownBadStatusProps) => Action<string>;
    updateCharacterAttributeDropdown: (v: UpdateCharacterAttributeDropdownProps) => Action<string>;
    openDeletionModal: (v: OpenDeletionModalProps) => Action<string>;
    closeModal: () => Action<string>;
    openCharacterDetails: (v: OpenCharacterDetailsProps) => Action<string>;
    copyCharacter: (v: CopyCharacterProps) => Action<string>;
    deleteCharacter: () => Action<string>;
    updateSkillAttributeText: (v: UpdateSkillAttributeTextProps) => Action<string>;
    deleteSkill: (v: DeleteSkillProps) => Action<string>;
    moveSkill: (v: MoveSkillProps) => Action<string>;
    updateCurrentGuildId: (v: UpdateCurrentGuildIdProps) => Action<string>;
    addNewCharacter: () => Action<string>;
    addNewSkill: () => Action<string>;
    loadCharacters: () => void;
    saveCharacters: (sessionName: string, v: FrontendCharacter[]) => void;
    saveCharactersNewly: (sessionName: string, characters: FrontendCharacter[]) => void;
    loadSkillsCsv: (characterId: CharacterId, files: FileList | null) => void;
    importCharactersByGuildId: (guildId: GuildId, characters: FrontendCharacter[]) => void;
    restoreHistory: () => Action<string>;
}

function mapStateToProps(state: State): CharacterTableState {
    return Object.assign({}, state.charactersTable);
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>): Actions {
    return {
        updateSessionName: (v: UpdateSessionNameTextProps) => dispatch(actions.updateSessionName(v)),
        updateCharacterAttributeNumber: (v: UpdateCharacterAttributeNumberProps) =>
            dispatch(actions.updateCharacterAttributeNumber(v)),
        updateCharacterAttributeText: (v: UpdateCharacterAttributeTextProps) =>
            dispatch(actions.updateCharacterAttributeText(v)),
        updateCharacterCheckbox: (v: UpdateCharacterCheckboxProps) => dispatch(actions.updateCharacterCheckbox(v)),
        updateButtonDropdownBadStatus: (v: UpdateButtonDropdownBadStatusProps) =>
            dispatch(actions.updateButtonDropdownBadStatus(v)),
        updateCharacterAttributeDropdown: (v: UpdateCharacterAttributeDropdownProps) =>
            dispatch(actions.updateCharacterAttributeDropdown(v)),
        openDeletionModal: (v: OpenDeletionModalProps) => dispatch(actions.openDeletionModal(v)),
        closeModal: () => dispatch(actions.closeModal()),
        deleteCharacter: () => dispatch(actions.deleteCharacter()),
        updateSkillAttributeText: (v: UpdateSkillAttributeTextProps) => dispatch(actions.updateSkillAttributeText(v)),
        deleteSkill: (v: DeleteSkillProps) => dispatch(actions.deleteSkill(v)),
        moveSkill: (v: MoveSkillProps) => dispatch(actions.moveSkill(v)),
        openCharacterDetails: (v: OpenCharacterDetailsProps) => dispatch(actions.openCharacterDetails(v)),
        copyCharacter: (v: CopyCharacterProps) => dispatch(actions.copyCharacter(v)),
        updateCurrentGuildId: (v: UpdateCurrentGuildIdProps) => dispatch(actions.updateCurrentGuildId(v)),
        addNewCharacter: () => dispatch(actions.addNewCharacter()),
        addNewSkill: () => dispatch(actions.addNewSkill()),
        loadCharacters: loadCharactersMapper(dispatch),
        saveCharacters: saveCharactersMapper(dispatch),
        saveCharactersNewly: saveCharactersNewlyMapper(dispatch),
        loadSkillsCsv: loadSkillsCsvMapper(dispatch),
        importCharactersByGuildId: importCharactersMapper(dispatch),
        restoreHistory: () => dispatch(actions.restoreHistory()),
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
                const characters: FrontendCharacter[] = resCharacters.map((character: Character) => ({
                    ...character,
                    frontendId: character.id || uuid.v4(),
                    skills: character.skills.map(s => ({ ...s, frontendId: s.id || uuid.v4() })),
                }));

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
    return (guildId: GuildId, currentCharacters: FrontendCharacter[]) => {
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
                    const characters: FrontendCharacter[] = [
                        ...currentCharacters,
                        ...importedCharacters.map((character: any) => ({
                            ...character,
                            frontendId: character.id || uuid.v4(),
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
    return (characterId: CharacterId, files: FileList | null) => {
        dispatch(actions.startedLoadingSkillsCsv({ characterId }));

        if (files === null || files.length === 0) {
            dispatch(actions.failedLoadingSkillsCsv({ params: { characterId }, error: {} }));
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
                const skills: FrontendSkill[] = parsedSkills.map(s => ({ ...s, frontendId: uuid.v4() }));

                dispatch(
                    actions.doneLoadingSkillsCsv({
                        params: { characterId },
                        result: { skills },
                    }),
                );
            })
            .catch(err => {
                console.log(err);
                dispatch(actions.failedLoadingSkillsCsv({ params: { characterId }, error: {} }));
            });
    };
}

function saveCharactersMapper(dispatch: Dispatch<Action<string>>) {
    return (sessionName: string, characters: FrontendCharacter[]) => {
        dispatch(actions.startedSaving({}));

        const id = location.pathname.split('/').slice(-1)[0];

        const serverCharacters = characters.map(character => {
            const { frontendId, ...serverCharacter } = character;
            return serverCharacter;
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
    return (sessionName: string, characters: FrontendCharacter[]) => {
        dispatch(actions.startedSavingNewly({}));

        // TODO. ここらへんのコピーとかの処理、どう考えてもサーバー側でやるべきじゃない？
        const serverCharacters = characters.map(character => {
            const { id: _, frontendId, badStatus, skills, ...serverCharacter } = character;
            const skillsWithoutId = skills.map(skill => {
                const { frontendId, id, ...skillWithoutId } = skill;
                return skillWithoutId;
            });
            const { id, ...badStatusWithoutId } = badStatus;
            return { ...serverCharacter, badStatus: badStatusWithoutId, skill: skillsWithoutId };
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
