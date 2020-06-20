import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import { Repository } from 'typeorm';
import { BattleSession } from './server/models/battle-session';
import { Character } from './server/models/character';

export type StateT = {};

export type CustomT = {
    ports: {
        battleSession: Repository<BattleSession>;
        character: Repository<Character>;
    };
};

export type Context = ParameterizedContext<StateT, CustomT>;

export type MiddleWare = Router<StateT, CustomT>;
