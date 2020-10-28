import { Character } from './character';

// TODO: Modal に Character 渡すのやめたい！！
export type Modal =
    | {
          type: 'DeletionModal';
      }
    | {
          type: 'CharacterDetailsModal';
          character: Character;
      };
