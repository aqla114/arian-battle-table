import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { FrontendSkill } from '../../types/skill';
import { CharacterID } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterID: CharacterID }, { skills: FrontendSkill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterID: CharacterID }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterID: CharacterID }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterID: CharacterID }, { skills: FrontendSkill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
