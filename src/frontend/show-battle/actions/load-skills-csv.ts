import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { FrontendSkill } from '../../types/skill';
import { CharacterId } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterId: CharacterId }, { skills: FrontendSkill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterId: CharacterId }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterId: CharacterId }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterId: CharacterId }, { skills: FrontendSkill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
