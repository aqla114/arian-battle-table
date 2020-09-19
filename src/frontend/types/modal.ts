import { CharacterProps } from '../show-battle/components/characters-table';

export type Modal =
    | {
          type: 'DeletionModal';
      }
    | {
          type: 'CharacterDetailsModal';
          character: CharacterProps;
      };
