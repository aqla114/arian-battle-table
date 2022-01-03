import { FrontendCharacter } from '../../types/character';
import { CharacterId, GuildId } from './actions/actions';
import { Modal } from './types/modal';

type _State = {
    sessionName: string;
    characters: FrontendCharacter[];
};

export type State = {
    state: _State;
    current: {
        currentGuildId: GuildId;
        deleteCharacterID: CharacterId;
        modalCharacterID: CharacterId;
        rollResult: number[];
        unsaved: boolean;
        history: _State[];
    };
    dom: {
        modal: Modal | null;
    };
};

export const initialState: State = {
    state: {
        sessionName: '',
        characters: [],
    },
    current: {
        currentGuildId: '',
        deleteCharacterID: '',
        modalCharacterID: '',
        rollResult: [0],
        unsaved: false,
        history: [],
    },
    dom: {
        modal: null,
    },
};
