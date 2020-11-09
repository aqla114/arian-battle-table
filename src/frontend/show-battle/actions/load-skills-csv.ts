import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { Skill } from '../../types/skill';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{}, Skill[], {}>('LOAD_SKILLS_CSV');

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{}>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{}, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{}, Skill[]>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
