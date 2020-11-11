import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { Skill } from '../../types/skill';
import { CharacterName } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterName: CharacterName }, { skills: Skill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterName: CharacterName }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterName: CharacterName }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterName: CharacterName }, { skills: Skill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
