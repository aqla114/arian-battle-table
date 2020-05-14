import * as React from 'react';

type Props = React.PropsWithChildren<{}>;

export const CardContainer: React.SFC<Props> = props => {
    return <div className="card-container">{props.children}</div>;
};
