import { CharacterId } from '../show-battle/actions/actions';

export type Modal =
    | {
          type: 'DeletionModal';
      }
    | {
          type: 'CharacterDetailsModal';
          characterId: CharacterId;
      };
