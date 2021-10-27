import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { FrontendSkill } from '../../types/skill';
import { CharacterId } from './actions';

const actionCreator = actionCreatorFactory();

type LoadSkillsCsvParams = { characterId: CharacterId };
type LoadSkillsCsvResult = { skills: FrontendSkill[] };

const loadCharacters = actionCreator.async<LoadSkillsCsvParams, LoadSkillsCsvResult, {}>('LOAD_SKILLS_CSV');

export type DoneLoadingSkillsCsvSuccess = Success<LoadSkillsCsvParams, LoadSkillsCsvResult>;

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<LoadSkillsCsvParams>;
    failedLoadingSkillsCsv: ActionCreator<Failure<LoadSkillsCsvParams, {}>>;
    doneLoadingSkillsCsv: ActionCreator<DoneLoadingSkillsCsvSuccess>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
