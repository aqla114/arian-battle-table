export type PageRoute = 'listBattleSessions' | 'showBattleSession';
export type APIRoute =
    | 'listBattleSessions'
    | 'getBattleSession'
    | 'createBattleSession'
    | 'updateBattleSession'
    | 'deleteBattleSession'
    | 'loadCharactersFromSheet'
    | 'createCharacter';

export type Route = {
    page: {
        [key in PageRoute]: string;
    };
    api: {
        [key in APIRoute]: string;
    };
};

export const routes: Route = {
    page: {
        listBattleSessions: '/battle-sessions',
        showBattleSession: '/battle-session/:id',
    },
    api: {
        listBattleSessions: '/api/list',
        getBattleSession: '/api/:id/get',
        createBattleSession: '/api/create',
        updateBattleSession: '/api/:id/update',
        deleteBattleSession: '/api/:id/delete',
        loadCharactersFromSheet: '/api/:id/load-characters-from-sheet',
        createCharacter: '/api/:sessionId/characters',
    },
};

export type RouteFunctions = {
    page: {
        [key in PageRoute & 'showBattleSession']: (id: string) => string;
    };
    api: {
        [key in APIRoute &
            (
                | 'getBattleSession'
                | 'updateBattleSession'
                | 'deleteBattleSession'
                | 'loadCharactersFromSheet'
                | 'createCharacter'
            )]: (id: string) => string;
    };
};

export const routeFunctions: RouteFunctions = {
    page: {
        showBattleSession: (id: string) => routes.page.showBattleSession.replace(':id', id),
    },
    api: {
        getBattleSession: (id: string) => routes.api.getBattleSession.replace(':id', id),
        updateBattleSession: (id: string) => routes.api.updateBattleSession.replace(':id', id),
        deleteBattleSession: (id: string) => routes.api.deleteBattleSession.replace(':id', id),
        loadCharactersFromSheet: (id: string) => routes.api.loadCharactersFromSheet.replace(':id', id),
        createCharacter: (id: string) => routes.api.createCharacter.replace(':id', id),
    },
};
