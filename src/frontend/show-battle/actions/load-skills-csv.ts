import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { Skill } from '../../types/skill';
import { CharacterUUID } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterUUID: CharacterUUID }, { skills: Skill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterUUID: CharacterUUID }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterUUID: CharacterUUID }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterUUID: CharacterUUID }, { skills: Skill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
