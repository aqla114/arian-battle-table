import { ChangeEvent, MouseEvent } from 'react';

export type ActionProps<S, T = undefined> = T extends undefined
    ? {
          e: S;
      }
    : {
          e: S;
          payload: T;
      };

export type ChangeActionProps<T = undefined> = ActionProps<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, T>;

export type MouseActionProps<T> = {
    e: MouseEvent<HTMLInputElement | HTMLLIElement, MouseEvent>;
    payload: T;
};
