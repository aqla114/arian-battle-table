import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { Skill } from '../../types/skill';
import { CharacterID } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterID: CharacterID }, { skills: Skill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterID: CharacterID }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterID: CharacterID }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterID: CharacterID }, { skills: Skill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
