import { Modal } from './types/modal';

export type BattleSession = {
    id: number;
    sessionName: string;
    createdAt: string;
    updatedAt: string;
};

export type State = {
    state: {
        battleSessions: BattleSession[];
    };
    current: { sessionName: string; deleteSessionId: number };
    dom: {
        modal: Modal | null;
    };
};

export const initialState: State = {
    state: {
        battleSessions: [],
    },
    current: {
        sessionName: '',
        deleteSessionId: -1,
    },
    dom: {
        modal: null,
    },
};
