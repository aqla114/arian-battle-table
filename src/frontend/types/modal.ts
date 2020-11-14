import { CharacterID } from '../show-battle/actions/actions';

export type Modal =
    | {
          type: 'DeletionModal';
      }
    | {
          type: 'CharacterDetailsModal';
          characterID: CharacterID;
      };
