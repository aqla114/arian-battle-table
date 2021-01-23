import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { FrontendSkill } from '../../types/skill';
import { CharacterId } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterID: CharacterId }, { skills: FrontendSkill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterID: CharacterId }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterID: CharacterId }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterID: CharacterId }, { skills: FrontendSkill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
