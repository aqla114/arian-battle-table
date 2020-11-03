import { CharacterName } from '../show-battle/actions/actions';

export type Modal =
    | {
          type: 'DeletionModal';
      }
    | {
          type: 'CharacterDetailsModal';
          characterName: CharacterName;
      };
