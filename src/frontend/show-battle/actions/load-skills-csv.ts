import actionCreatorFactory, { ActionCreator, Failure, Success } from 'typescript-fsa';
import { Skill } from '../../types/skill';
import { CharacterFrontEndID } from './actions';

const actionCreator = actionCreatorFactory();

const loadCharacters = actionCreator.async<{ characterID: CharacterFrontEndID }, { skills: Skill[] }, {}>(
    'LOAD_SKILLS_CSV',
);

interface LoadSkillsCsvActions {
    startedLoadingSkillsCsv: ActionCreator<{ characterID: CharacterFrontEndID }>;
    failedLoadingSkillsCsv: ActionCreator<Failure<{ characterID: CharacterFrontEndID }, {}>>;
    doneLoadingSkillsCsv: ActionCreator<Success<{ characterID: CharacterFrontEndID }, { skills: Skill[] }>>;
}

export const loadSkillsCsvActions: LoadSkillsCsvActions = {
    startedLoadingSkillsCsv: loadCharacters.started,
    failedLoadingSkillsCsv: loadCharacters.failed,
    doneLoadingSkillsCsv: loadCharacters.done,
};
