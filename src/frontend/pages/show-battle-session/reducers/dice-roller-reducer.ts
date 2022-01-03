import { UpdateRollResultProps } from '../actions/update-roll-result';
import { State } from '../state';

export const updateRollResult: (state: State, props: UpdateRollResultProps) => State = (state, props) => {
    return { ...state, current: { ...state.current, rollResult: props.rollResult } };
};
