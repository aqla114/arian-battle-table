import { ParameterizedContext } from 'koa';
import { StateT, CustomT } from './server/mk-router';

export type Context = ParameterizedContext<StateT, CustomT>;
