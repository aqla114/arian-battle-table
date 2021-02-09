export type ActionProps<S, T = undefined> = T extends undefined
    ? {
          e: S;
      }
    : {
          e: S;
          payload: T;
      };

export type ChangeActionProps<T = undefined> = ActionProps<
    React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    T
>;

export type MouseActionProps<T> = {
    e: React.MouseEvent<HTMLInputElement | HTMLLIElement, MouseEvent>;
    payload: T;
};
