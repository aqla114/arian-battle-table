import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import { Repository } from 'typeorm';
import { BattleSession as BattleSessionModel } from './models/battle-session';
import { Character as CharacterModel } from './models/character';

export type StateT = {};

export type CustomT = {
    ports: {
        battleSession: Repository<BattleSessionModel>;
        character: Repository<CharacterModel>;
    };
};

export type Context = ParameterizedContext<StateT, CustomT>;

export type MiddleWare = Router<StateT, CustomT>;
