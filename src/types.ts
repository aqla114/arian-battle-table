import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

export type Context = ParameterizedContext<any, Router.IRouterParamContext<any, {}>>;
