export type Route = {
    page: {
        listBattleSessions: string;
        showBattleSession: string;
    };
    api: {
        listBattleSessions: string;
        getBattleSession: string;
        createBattleSession: string;
        updateBattleSession: string;
        deleteBattleSession: string;
        loadCharactersFromSheet: string;
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
    },
};
