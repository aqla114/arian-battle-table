import { FrontendCharacter } from '../../types/character';

export type ACTION_TYPE = 'COPY_CHARACTER';

// TODO : 実は、character の frontendId を渡すべきでは？
export type CopyCharacterProps = { character: FrontendCharacter };
