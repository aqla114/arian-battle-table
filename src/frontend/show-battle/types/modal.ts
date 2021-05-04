import { CharacterId } from '../actions/actions';

export type Modal =
    | {
          type: 'DeletionModal';
      }
    | {
          type: 'CharacterDetailsModal';
          characterId: CharacterId;
      };
