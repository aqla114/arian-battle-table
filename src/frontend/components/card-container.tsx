import * as React from 'react';

type Props = React.PropsWithChildren<{
    className?: string;
}>;

export const CardContainer: React.SFC<Props> = props => {
    return <div className={`card-container ${props.className || ''}`}>{props.children}</div>;
};
